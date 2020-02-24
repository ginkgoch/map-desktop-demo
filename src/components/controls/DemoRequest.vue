<template>
  <div class="container">
    <div class="form-group">
      <input type="email" :class="emailStyle" placeholder="Your Email" v-model="email" required />
    </div>
    <div class="form-group">
      <textarea
        v-model="request" required
         :class="requestStyle"
        placeholder="Demo Description. Note: The description is better to restrict to one click function."
      />
    </div>
    <div class="text-center">
        <button class="btn btn-outline-success btn-request" @click="sendRequest">Submit</button>
        <p><small :class="messageStyle">{{ errMsg }}</small></p>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import AV from 'leancloud-storage';

const appId = 'YKkn0nodgkFDKWX9CjFrH2H2-gzGzoHsz';
const appKey = 'dCTpFBbK8Kj1wvQlIOYozpfT';
const serverURLs = 'https://ykkn0nod.lc-cn-n1-shared.com';
const requestSentSuccess = 'Request sent successfully. I will contact you soon.';

AV.init({ appId, appKey, serverURLs });

export default {
    data() {
        return {
            email: '',
            emailValid: true,
            request: '',
            requestValid: true,
            errMsg: undefined,
        }
    },
    computed: {
        emailStyle() {
            return 'form-control' + (this.emailValid?'':' is-invalid');
        },
        requestStyle() {
            return 'form-control  txarea-request' + (this.requestValid?'':' is-invalid');
        },
        messageStyle() {
            if (_.isEmpty(this.errMsg)) { 
                return '';
            }
            else if (this.errMsg === requestSentSuccess) {
                return 'text-success';
            }
            else {
                return 'text-danger';
            }
        }
    },
    methods: {
        async sendRequest() {
            this.$setStatus('');

            let err = '';
            if (_.isEmpty(this.email)) {
                err += 'Email is empty. ';
                this.emailValid = false;
            }
            else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
                err += 'Email address is invlid. ';
                this.emailValid = false;
            }

            if (_.isEmpty(this.request)) {
                err += 'Request description is empty. ';
                this.requestValid = false;
            }

            if (!_.isEmpty(err)) {
                this.errMsg = err;
                return;
            }

            const Message = AV.Object.extend('Messages');
            const message = new Message();
            message.set('author', this.email);
            message.set('email', this.email);
            message.set('title', 'DEMO REQUEST - ' + +new Date());
            message.set('message', this.request);

            try {
                await message.save();
                this.$setStatus(null);
                this.errMsg = requestSentSuccess;
            }
            catch(err) {
                this.$setStatus(err);
            }
        },
        $setStatus(err) {
            let isValid = _.isEmpty(err)

            this.emailValid = isValid;
            this.requestValid = isValid;
            this.errMsg = err;
        }
    }
};
</script>

<style>
.txarea-request {
    height: 125px!important;
}

.btn-request {
    width: 40%;
}
</style>