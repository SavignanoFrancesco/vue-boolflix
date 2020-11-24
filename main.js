var app = new Vue({
    el: '#root',
    data: {
        movies: [],
        movie_searched: '',
        max_vote: 5
    },
    methods: {
        movieRequest(){
            const self = this;
            if (self.movie_searched != '') {
                //richiesta al server
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
        getLanguageFlag(movie){
            if (movie.original_language == 'en') {
                return 'bandiere/en.jpg';
            }else if (movie.original_language == 'it') {
                return 'bandiere/it.jpg';
            }else if (movie.original_language == 'es') {
                return 'bandiere/es.png';
            }else if (movie.original_language == 'ja') {
                return 'bandiere/ja.png';
            }else if (movie.original_language == 'de') {
                return 'bandiere/de.jpg';
            }else if (movie.original_language == 'fr') {
                return 'bandiere/fr.jpg';
            }
        }
    },
    mounted() {





    }
});
