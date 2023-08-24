const buffer = 10
let lengthOfDataPerOneBuffer = 0
let receivedDatacount = 0


function updateLoadingBar(){
    const loadBar = document.querySelector(".progress-bar")
    const totalDataNum = lengthOfDataPerOneBuffer * buffer
    const numOfAllData = receivedDatacount * lengthOfDataPerOneBuffer
    const percentageOfReceivedData = (numOfAllData / totalDataNum) * 100

    let marginRightValue = 0

    function animateMarginRight() {
        marginRightValue -= 20
        loadBar.style.marginRight = `${100 + marginRightValue}%`

        if (marginRightValue > -100) {
            setTimeout(animateMarginRight, 50)
        }
    }

    // loadBar.style.marginRight = `${percentageOfReceivedData - 90}%`

    animateMarginRight()

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
        lengthOfDataPerOneBuffer = jsonResponse.length
        receivedDatacount += 1


    }
    catch (error) {
        console.log("Error:", error)
    }
}


async function processRequests() {
    for (let i = 0; i < buffer; i++) {
        await requestData(i)

        if (lengthOfDataPerOneBuffer != 0){
            updateLoadingBar()
        }

    }
}

processRequests()