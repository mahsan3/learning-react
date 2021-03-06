import React from "react";
import SecuritiesSearchForm from "../components/SecuritiesSearchForm";
import {connect} from "react-redux";
import {favoriteSymbol, searchSecurities, unfavoriteSymbol} from "../../store/actions/securities.actions";
import SearchResults from "../components/SearchResults";
import {Link} from "react-router-dom";

function Home(props) {

    const updateSearchResults = q => {
        console.log(`The query is ${q}`);
        props.search(q);
    };

    const toggleSymbolToFav = (symbol, isFav) => {
        console.log(`You just favorited ${symbol} and fav status is ${isFav}`);
        if(!isFav) props.favSymbol(symbol);
        else props.unfavSymbol(symbol);
    };

    return (
        <>
            <div className="jumbotron p-2">

                <h1 className="display-4">Securities Search</h1>
                <div className="d-flex justify-content-between flex-wrap">
                    <p className="lead">
                        Simple React application that integrates with the <a href="https://www.alphavantage.co" target="_blank">Alphavantage API</a>
                    </p>
                    <Link to="/favorites">
                        <button type="button" className="btn btn-outline-primary">
                            My Favorites ({props.totalFavorites})
                        </button>
                    </Link>
                </div>


                <hr className="my-4" />

                <SecuritiesSearchForm updateSearchResults={updateSearchResults} />

            </div>

            <div className="row flex-column align-items-center mb-4">
                <div className="col col-md-8 col-lg-6 text-center justify-content-center">
                    {
                        props.isLoading ?
                            <span>...Loading...</span> :
                            <SearchResults securitiesList={props.securitiesList}
                                           toggleFav={toggleSymbolToFav}/>
                    }
                </div>
            </div>

        </>
    );
}

// Wire up this component to the store
function mapStateToProps(state) {
    return {
        totalFavorites: state.searchReducer.favSymbols.length,
        securitiesList: state.searchReducer.searchResults.map(item => {
            return {
                ...item,
                isFavorite: state.searchReducer.favSymbols.includes(item['1. symbol'])
            }
        }),
        isLoading: state.searchReducer.isLoading
    }
}

function mapDispatchToProps(dispatch) {

    return {
      search: q => dispatch(searchSecurities(q)),
      favSymbol: s => dispatch(favoriteSymbol(s)),
      unfavSymbol: s => dispatch(unfavoriteSymbol(s)),
    };

}

Home = connect(mapStateToProps, mapDispatchToProps)(Home);

export default Home;