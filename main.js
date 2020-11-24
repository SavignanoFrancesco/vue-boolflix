var app = new Vue({
    el: '#root',
    data: {
        movies: [],
        title_searched: '',
        tvshows: [],
        max_vote: 5,
        known_languages: ['en','it','fr','es','ja','de']
    },
    methods: {
        movieRequest(){
            const self = this;
            if (self.title_searched != '') {
                //richiesta al server
                axios
                    .get('https://api.themoviedb.org/3/search/movie', {
                        params:
                            {
                                api_key: '26a07cb4c3a1c1a713d00530e848c684',
                                query: self.title_searched,
                                language: 'it'
                            }
                        })
                    .then(function(risposta) {

                        //metto la risposta dell'API in un array
                        self.movies = risposta.data.results;

                        //trasformo i voti da base 10 a base 5
                        self.movies.forEach((movie, i) => {
                            movie.vote_average = Math.round(movie.vote_average / 2);
                        });

                        console.log(self.movies);
                    });
            }else{
                alert('Devi inserire qualcosa nell\'input!!');
            }
        },
        tvshowsRequest(){
            const self = this;
            if (self.title_searched != '') {
                //richiesta al server
                axios
                    .get('https://api.themoviedb.org/3/search/tv', {
                        params:
                            {
                                api_key: '26a07cb4c3a1c1a713d00530e848c684',
                                query: self.title_searched,
                                language: 'it'
                            }
                        })
                    .then(function(risposta) {

                        //metto la risposta dell'API in un array
                        self.tvshows = risposta.data.results;

                        //trasformo i voti da base 10 a base 5
                        self.tvshows.forEach((show, i) => {
                            show.vote_average = Math.round(show.vote_average / 2);
                        });

                        console.log(self.tvshows);
                    });
            }else{
                alert('Devi inserire qualcosa nell\'input!!');
            }
        },
        getLanguageFlag(title){

            return 'bandiere/' + title.original_language + '.jpg';

        }
    },
    mounted() {





    }
});
