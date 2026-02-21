let counter = document.getElementById("counter");
let probdisplay = document.getElementById("probdisplay");
let incrementbutton = document.getElementById("increment");
let incrementsetting = document.getElementById("incrementamount");
let probabilitysetting = document.getElementById("probabilityvalue");

let currentcount;
let probability;
let increment;

function updatecounts(newnum=currentcount) {
    currentcount = newnum;
    localStorage.setItem("count", newnum.toString());
    counter.value = newnum.toString();

    let p = (1-((1-1/probability)**newnum))*100;
    probdisplay.textContent = p.toFixed(2) + "%";
}




let savedprobability = localStorage?.getItem("probability");
	if (savedprobability) {
		probability = Number(savedprobability);
        probabilitysetting.value = savedprobability
	} else {
		probability = 4096;
        probabilitysetting.value = "4096";
	}
    

let savedincrement = localStorage?.getItem("increment");
	if (savedincrement) {
		increment = Number(savedincrement);
        incrementsetting.value = savedincrement;
	} else {
		increment = 1;
        incrementsetting.value = "1";
	}

let savedcount = localStorage?.getItem("count");
	if (savedcount) {
		updatecounts(Number(savedcount));
	} else {
		updatecounts(0);
	}




counter.addEventListener("change", (e)=>{
    if (isNaN(Number(counter.value))) {
        updatecounts();
    } else {
        updatecounts(Number(counter.value));
    }
})

incrementbutton.addEventListener("click", (e)=>{
    updatecounts(currentcount+increment);
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
})

incrementsetting.addEventListener("change", (e)=> {
    if (isNaN(Number(incrementsetting.value))) {
        incrementsetting.value = increment.toString();
    } else {
        increment = Number(incrementsetting.value)
        localStorage.setItem("increment", incrementsetting.value)
    }
})

probabilitysetting.addEventListener("change", (e)=> {
    if (isNaN(Number(probabilitysetting.value))) {
        probabilitysetting.value = probability.toString();
    } else {
        probability = Number(probabilitysetting.value)
        localStorage.setItem("probability", probabilitysetting.value)
        updatecounts();
    }
})