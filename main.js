var app = new Vue({
    el: '#root',
    data: {
    
    },
    methods: {

    },
    mounted() {

        const self = this;
        axios
            .get('https://flynn.boolean.careers/exercises/api/array/music')
            .then(function(risposta) {

                self.cds = risposta.data.response;

            });

    }
});
