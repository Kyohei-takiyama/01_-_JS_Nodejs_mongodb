const threadSectionDOM = document.querySelector(".thread-section");
const inputTextDOM = document.getElementById("inputTitle");
const inputContentDOM = document.getElementById("inputContet");
const formDOM = document.querySelector(".form-section");

let inputText ="";
let inputContentText = "";

// 最初はThreadのすべてを読み込む
const getAllThreads = async () => {
    try{
        let allThread = await axios.get("/api/v1/thread");
        console.log(allThread);
        let { data } = allThread
        console.log(data);

        // 出力
        allThread = data.map(thread => {
            const {title , content} = thread;
            console.log(title,content);
            return `
            <div class="single-thread">
                <h3>${title}</h3>
                <p>${content}</p>
            </div>
            `
        }).join("");
        console.log(allThread);
        threadSectionDOM.innerHTML = allThread;
    }catch(err){
        console.log(err);
    }
}

getAllThreads();

// postメソッド
inputTextDOM.addEventListener("change" , e => {
    inputText = e.target.value;
    console.log(inputText);
})
inputContentDOM.addEventListener("change" , e => {
    inputContentText = e.target.value;
})

formDOM.addEventListener("submit" ,async (e) => {
    e.preventDefault();

    if(inputText && inputContentText){
        try{
        console.log("add Data");
        await axios.post("/api/v1/thread",{
            title:inputText,
            content:inputContentText
        });
    getAllThreads();
    }catch(err){
        console.log(err);
    }
    }
})
