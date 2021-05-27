const elasticsearch=require('elasticsearch');

module.exports = new elasticsearch.Client( {  
    host: 'localhost:9200',
    log: 'trace',
    apiVersion: '7.2', // use the same version of your Elasticsearch inst
});

