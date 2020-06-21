import React, {Component} from "react";

class DailyTotal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let total = 0
        this.props.foodlist.map((item) => total = total + Math.floor(item.calories))
        return (
            <div className = "dailyTotals">
                <ul>
                    {this.props.foodlist.map((item) => <li>
                        <p>{item.food}: {Math.floor(item.calories)}</p>
                        <button onClick={this.props.removeFromTotal.bind(this, item)} value={item}>-</button>
                    </li>)}
                </ul>
                <p>{total}</p>
            </div>
        )
    }
}

export default DailyTotal;