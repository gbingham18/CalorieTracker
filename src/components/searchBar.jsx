import React, {Component} from "react";
import FoodObjects2 from '../data/FoodObjects2.json'
import Result from '../components/Result.jsx'
import DailyTotal from '../components/DailyTotal.jsx'

class SearchBar extends Component {
    constructor (props) {
        super(props)
        this.state = {
            suggestions: [],
            results: [],
            text: "",
            selectionMade: false,
            resultsFound: true,
            dailyTotalList: []
        }
        this.setResults = this.setResults.bind(this);
        this.onTextChanged = this.onTextChanged.bind(this);
        this.clearResults = this.clearResults.bind(this);
        this.suggestionSelected = this.suggestionSelected.bind(this);
        this.addToTotal = this.addToTotal.bind(this);
        this.removeFromTotal = this.removeFromTotal.bind(this);
    }
//#region event handlers
    onTextChanged = (e) => {
        const FoodObjects = require("../data/FoodObjects2.json")
        const value = e.target.value;
        let suggestions = [];
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = FoodObjects.filter(fo => regex.test(fo.food));
        }
        suggestions = suggestions.slice(0, 4);
        this.setState(() => ({suggestions, text: value, selectionMade: false}));
    }

    setResults = (e) => {
        const FoodObjects = require("../data/FoodObjects2.json");
        const value = e.target.value;
        const { text } = this.state;
        let results = [];
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            results = FoodObjects.filter(fo => regex.test(fo.food));
        }
        if (results.length == 0 && text.length > 0) {
            this.setState(() => ({
                resultsFound: false
            }))
        }
        this.setState(() => ({
            suggestions: [],
            text: "", 
            results,
            selectionMade: true
        }))  
    }

    clearResults = (e) => {
        this.setState(() => ({
            results: [],
            resultsFound: true
        }))
    }

    suggestionSelected = (value) => {
        this.setState(() => ({
           text: value,
           suggestions: [], 
           selectionMade: true
        }))
    }

    addToTotal = (newItem, e) => {
        const {dailyTotalList} = this.state;
        let newTotal = dailyTotalList
        newTotal.push(newItem)
        this.setState(() => ({
            dailyTotalList: newTotal
        }))
    }

    removeFromTotal = (itemToRemove, e) => {
        const {dailyTotalList} = this.state;
        const newTotal = dailyTotalList.filter(item => item.id !== itemToRemove.id)
        this.setState(() => ({
            dailyTotalList: newTotal
        }))       
    }
//#endregion
//#region render methods
    renderSuggestions () {
        const { suggestions } = this.state;
        const { text } = this.state;
        const { selectionMade } = this.state;
        if ((suggestions.length === 0 && text === "") || selectionMade) {
            return null;
        }
        if (suggestions.length === 0 && text !== "" && !selectionMade) {
            return (
                <ul>
                    <li><p>No Suggestions Found</p></li>
                </ul>
            );
        }
        else {
            return (
                    <ul>
                        {suggestions.map((item) => <li onClick={() => this.suggestionSelected(item.food)}><Result food={item} isSuggestion={true}/></li>)}
                    </ul> 
            );
        }
    }

    renderResults () {
        const { results } = this.state;
        const { resultsFound } = this.state;
        if (results.length > 0) {
            return (
                <div className="Results">
                    <ul>
                        {results.map((item) => <li><Result food={item} isSuggestion={false} addToTotal={this.addToTotal}/></li>)}
                    </ul>
                    <button onClick={this.clearResults} > Clear </button>
                </div>
            );
        }
        if (!resultsFound) {
            return (
                <div className="NoResults">
                    <ul>
                        <li><p>No Results Found</p></li>
                    </ul>
                    <button onClick={this.clearResults} > Clear </button>
                </div>
            );
        }
    }

    renderTotal () {
        const { dailyTotalList } = this.state;
        if (dailyTotalList.length > 0) {
            return (
                <div className="dailyTotalSection">
                    <DailyTotal foodlist={dailyTotalList} removeFromTotal={this.removeFromTotal}></DailyTotal>
                </div>
            );
        }
    }
//#endregion
    render() {
        const { text } = this.state;
        return  (
            <div className="main">
                <div className="SearchBar">
                    <div className="SearchButton">
                        <input onChange={this.onTextChanged} value={text} type='text' placeholder='Search Food' name='searchFood'/>
                        <button onClick={this.setResults} value={text}> Search </button>
                    </div>
                    <div className="Suggestions">
                        {this.renderSuggestions()}
                    </div>
                </div>
                {this.renderResults()}
                {this.renderTotal()}
            </div>
        )
    }
}

export default SearchBar;