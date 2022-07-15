import { ref } from "vue"

export const notamCode = ref({
    validity: {
        0: ["Active", "bg-success"],
        1: ["Future", "bg-warning"],
        2: ["All", "bg-primary"]
    },
    type: {
        N: ["New", "bg-success"],
        C: ["Cancel", "bg-danger"],
        R: ["Replaced", "bg-warning"],
        S: ["Snow", "bg-primary"]
    },
    code23: {

    }, 
    code45: {
        
    }
})