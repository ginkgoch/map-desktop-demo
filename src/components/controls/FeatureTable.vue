<template>
    <source-table :source="tableSource" />
</template>

<script>
import Table from '@/components/controls/Table';

export default {
    name: 'feature-table',
    props: ['features'],
    components: { 'source-table': Table },
    data() {
        return { tableSource: [] };
    },
    watch: {
        features(newValue) {
            let tableSource = [];
            if (newValue.length > 0) {
                tableSource.push(newValue[0].properties.keys());
            }

            newValue.forEach(f => tableSource.push(f.properties.values()));
            this.tableSource = tableSource;
        }
    }
};
</script>