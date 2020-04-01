import React, { Component } from "react";
import axios from "axios";

class Fib extends Component {
    state = {
        seenIndexes: [],
        values: {},
        index: ""
    };

    componentDidMount() {
        this.fetchValues();
        this.fetchIndexes();
    }

    fetchValues = async () => {
        const values = await axios.get("/api/values/current");

        this.setState({
            values: values.data
        });
    };

    fetchIndexes = async () => {
        const seenIndex = await axios.get("/api/values/all");
        this.setState({
            seenIndexes: seenIndex.data
        });
    };

    renderSeenIndexes() {
        return this.state.seenIndexes.map(({ number }) => number).join(", ");
    }

    renderValues() {
        const entries = [];

        for (let key in this.state.values) {
            entries.push(
                <div key={key}>
                    For index {key}, I calculated {this.state.values[key]}
                </div>
            );
        }
        return entries;
    }

    handleSubmit = async event => {
        event.preventDefault();

        await axios.post("/api/values", {
            index: this.state.index
        });

        this.setState({ index: "" });
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter your index</label>
                    <input
                        value={this.state.index}
                        onChange={event =>
                            this.setState({ index: event.target.value })
                        }
                    ></input>
                    <button>Submit</button>
                </form>

                <h3>Recently seen Indexes</h3>
                {this.state.seenIndexes && this.state.seenIndexes[0]
                    ? this.renderSeenIndexes()
                    : null}

                <h3>Recently seen values</h3>
                {this.state.values ? this.renderValues() : null}
            </div>
        );
    }
}

export default Fib;
