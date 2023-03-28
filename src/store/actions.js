const actions = {
    add1(state, step) {
        if (state.state.sum < 100) {
            let a = setInterval(() => {
                state.commit("cc", step)
                console.log(state.state.sum);

            }, 1000)
        }
    }
},

export default actions