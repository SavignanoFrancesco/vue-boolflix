var app = new Vue({
    el: '#root',
    data: {
        api_key: '26a07cb4c3a1c1a713d00530e848c684',
        language: 'it',
        title_searched: '',
        title_search_support: '',
        movies: [],
        tvshows: [],
        max_vote: 5,
        known_languages: ['en','it','fr','es','ja','de'],
        loading_movies: false,
        loading_tvshows: false,
        no_results_movies: false,
        no_results_tvshows: false,
        cover_starting_url: 'https://image.tmdb.org/t/p/',
        cover_size: 'w300',


    },
    methods: {
        titleRequest(){

            //salvo l'imput gestito dal v-bind in una variabile di supporto
            this.title_search_support = this.title_searched;

            //non posso inviare una stringa vuota
            if (this.title_searched != '') {

                //inizio caricamento
                this.loading_movies = true;

                //richiesta al server(movies)
                axios
                    .get('https://api.themoviedb.org/3/search/movie', {
                        params:
                            {
                                api_key: this.api_key,
                                query: this.title_searched,
                                language: this.language
                            }
                        })
                    .then((risposta) => {

                        //metto la risposta dell'API in un array
                        this.movies = risposta.data.results;

                        //trasformo i voti da base 10 a base 5
                        this.movies.forEach((movie, i) => {
                            movie.vote_average = Math.round(movie.vote_average / 2);
                        });

                        //fine caricamento, la risposta è arrivata
                        this.loading_movies = false;

                        //se non ci sono risultati nella risposta
                        if (this.movies.length == 0) {
                            this.no_results_movies = true;
                        }else{
                            this.no_results_movies = false;
                        }

                        console.log(this.movies);
                    });

                    //inizio caricamento
                    this.loading_tvshows = true;
                    //richiesta al server
                    axios
                        .get('https://api.themoviedb.org/3/search/tv', {
                            params:
                                {
                                    api_key: this.api_key,
                                    query: this.title_searched,
                                    language: 'it'
                                }
                            })
                        .then((risposta) => {

                            //metto la risposta dell'API in un array
                            this.tvshows = risposta.data.results;

                            //trasformo i voti da base 10 a base 5
                            this.tvshows.forEach((show, i) => {
                                show.vote_average = Math.round(show.vote_average / 2);
                            });

                            //fine caricamento, la risposta è arrivata
                            this.loading_tvshows = false;

                            //se non ci sono risultati nella risposta
                            if (this.tvshows.length == 0) {
                                this.no_results_tvshows = true;
                            }else{
                                this.no_results_tvshows = false;
                            }

                            console.log(this.tvshows);
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
