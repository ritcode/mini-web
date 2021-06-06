inpNum = document.getElementById('inpNum')
btnPrint = document.getElementById('btnPrint')
ulList = document.getElementById('ulList')

btnPrint.onclick = function () {
    let start = Date.now()
    ulList.innerHTML = ""

    let c3=0 , c5=0;
    for (let i = 1; i <= inpNum.value; i++) {
        //console.log(i);
        li = document.createElement('li')
        //li.innerText = fun(i)
        

        c3++
        c5++

        let print = ''
        if (c3==3) {c3=0; print+="fizz"}
        if (c5==5) {c5=0; print+="buzz"}
        if(print =='') print=i
        li.innerText = print
        

        ulList.appendChild(li)
    }
    console.log("Time taken : ", Date.now()-start)
};


// function fun(i) {
//     if (i % 3 == 0 & i % 5 == 0)
//         return "fizzbuzz"
//     else if (i % 3 == 0)
//         return "fizz"
//     else if (i % 5 == 0)
//         return "buzz"
//     else return i
// }