var app = new Vue({
    el: '#root',
    data: {
        movies: [],
        movie_searched: ''
    },
    methods: {
        movieRequest(){
            const self = this;
            axios
                .get('https://api.themoviedb.org/3/search/movie', {
                    params:
                        {
                            api_key: '26a07cb4c3a1c1a713d00530e848c684',
                            query: self.movie_searched,
                            language: 'it'
                        }
                    })
                .then(function(risposta) {

                    self.movies = risposta.data.results;
                    console.log(self.movies);
                });
        }
    },
    mounted() {




    }
});
