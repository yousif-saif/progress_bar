const buffer = 10
const loadingBar = document.querySelector(".progress-bar")

function updateLoadingBar(jsonResponse){
    const whereShouldStop = 100 - jsonResponse[jsonResponse.length - 1].percentage_of_data

    const marginRightPixels = parseFloat(window.getComputedStyle(loadingBar).marginRight)
    const parentWidth = parseFloat(window.getComputedStyle(loadingBar.parentElement).width)

    let marginRightPercentage = (marginRightPixels / parentWidth) * 100


    for (let i = 0; i < (marginRightPercentage - whereShouldStop) + buffer; i++){
        loadingBar.style.marginRight = `${marginRightPercentage - 1}%`
        marginRightPercentage--

    }
}


async function requestData(i){
    try{
        const response = await fetch("http://127.0.0.1:5000/get_data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({curr_index: i})
        })

        if (!response.ok){
            throw new Error(`ohh shit, here we go agian, ${response.status}`)

        }

        const jsonResponse = await response.json()

        updateLoadingBar(jsonResponse)


    }
    catch (error) {
        console.log("Error:", error)
    }
}


async function processRequests() {
    for (let i = 0; i < buffer; i++) {
        await requestData(i + 1)

    }
}

processRequests()