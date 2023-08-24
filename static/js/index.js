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
        console.log(jsonResponse)


    }
    catch (error) {
        console.log("Error:", error)
    }
}


async function processRequests() {
    for (let i = 0; i < 10; i++) {
        await requestData(i);
    }
}

processRequests()