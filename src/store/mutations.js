const mutation = {
    mutationSelectTags(state, data) {
        let result = false
        for (let i = 0; i < state.stateTagsList.length; i++) {
            if (state.stateTagsList[i].path == data.path) {
                return result = true
            }
        }
        result === false ? state.stateTagsList.push(data) : ''
    },
    /**
        * 关闭tag标签
    */
    mutationCloseTag(state, data) {
        let result = state.stateTagsList.findIndex(item => item.path === data.path)
        state.stateTagsList.splice(result, 1)
    },
    /**
        * 关闭全部标签
    */
    mutationCloseAllTag(state, data) {
        state.stateTagsList = []
    }
};

export default mutation