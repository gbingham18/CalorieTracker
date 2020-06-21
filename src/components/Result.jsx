import React, {Component} from "react";

class Result extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (!this.props.isSuggestion) {
            return  (
                <div className="ResultItem">
                    <p>{this.props.food.food}: {Math.floor(this.props.food.calories)}</p>
                    <button onClick={this.props.addToTotal.bind(this, this.props.food)} value={this.props.food}>+</button> 
                </div>
            )
        }
        else {
            return  (
                <div>
                    <p>{this.props.food.food}</p>
                </div>
            )
        }
    }
}

export default Result;