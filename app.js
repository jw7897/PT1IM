window.onload = function() {
  if (document.getElementById("addSubmit")) {
    document.getElementById("addSubmit").onclick = addItem;
  }
  if (document.getElementById("removeSubmit")) {
    document.getElementById("removeSubmit").onclick = removeItem;
  }
  if (document.getElementById("viewInv")) {
    document.getElementById("viewInv").onclick = viewInv;
  }
  if (document.getElementById("viewTrans")) {
    document.getElementById("viewTrans").onclick = viewTrans;
  }

};

function addItem() {
  let id = parseInt(document.getElementById("addID").value);
  let quant = parseInt(document.getElementById("addQuant").value);
  let db = JSON.parse(sessionStorage.getItem("db"));
  let trans = JSON.parse(sessionStorage.getItem("trans"));

  for (let i = 0; i < db.snacks.length; i++) {
    if (id === parseInt(db.snacks[i].id)) {
      db.snacks[i].quant = parseInt(db.snacks[i].quant) + quant;
      sessionStorage.setItem("db", JSON.stringify(db));
      trans.push({
        name: db.snacks[i].name,
        amount: quant
      })
      sessionStorage.setItem("trans", JSON.stringify(trans));
      alert("Item(s) added succesfully");
      return;
    }
  }
}


function removeItem() {
  let id = parseInt(document.getElementById("removeID").value);
  let quant = parseInt(document.getElementById("removeQuant").value);
  let db = JSON.parse(sessionStorage.getItem("db"));
  let trans = JSON.parse(sessionStorage.getItem("trans"));
  for (let i = 0; i < db.snacks.length; i++) {
    if (id === parseInt(db.snacks[i].id)) {
      if (db.snacks[i].quant - quant < 0) {
        alert("Cannot remove more than what's in stocks");
      } else {
        db.snacks[i].quant = parseInt(db.snacks[i].quant) - quant;
        sessionStorage.setItem("db", JSON.stringify(db));
        trans.push({
          name: db.snacks[i].name,
          amount: -quant
        })
        sessionStorage.setItem("trans", JSON.stringify(trans));
        alert("Item(s) removed succesfully");
        return;
      }
    }
  }
}

function viewInv() {
  document.getElementById("chips").innerHTML = JSON.parse(sessionStorage.getItem("db")).snacks[0].name + "-" + JSON.parse(sessionStorage.getItem("db")).snacks[0].quant;
  document.getElementById("popcorn").innerHTML = JSON.parse(sessionStorage.getItem("db")).snacks[1].name + "-" + JSON.parse(sessionStorage.getItem("db")).snacks[1].quant
  document.getElementById("gum").innerHTML = JSON.parse(sessionStorage.getItem("db")).snacks[2].name + "-" + JSON.parse(sessionStorage.getItem("db")).snacks[2].quant
  document.getElementById("icecream").innerHTML = JSON.parse(sessionStorage.getItem("db")).snacks[3].name + "-" + JSON.parse(sessionStorage.getItem("db")).snacks[3].quant
  document.getElementById("pretzels").innerHTML = JSON.parse(sessionStorage.getItem("db")).snacks[4].name + "-" + JSON.parse(sessionStorage.getItem("db")).snacks[4].quant
  document.getElementById("crackers").innerHTML = JSON.parse(sessionStorage.getItem("db")).snacks[5].name + "-" + JSON.parse(sessionStorage.getItem("db")).snacks[5].quant
  document.getElementById("cookies").innerHTML = JSON.parse(sessionStorage.getItem("db")).snacks[6].name + "-" + JSON.parse(sessionStorage.getItem("db")).snacks[6].quant
  document.getElementById("candy").innerHTML = JSON.parse(sessionStorage.getItem("db")).snacks[7].name + "-" + JSON.parse(sessionStorage.getItem("db")).snacks[7].quant
  document.getElementById("trailmix").innerHTML = JSON.parse(sessionStorage.getItem("db")).snacks[8].name + "-" + JSON.parse(sessionStorage.getItem("db")).snacks[8].quant
}

function viewTrans() {
  let transHTML = "";
  let trans = JSON.parse(sessionStorage.getItem("trans"));
  for (let i = 0; i < trans.length; i++) {
    if (trans[i].amount > 0) {
      transHTML += trans[i].name + ": +" + trans[i].amount + "  <br>"
    } else {
      transHTML += trans[i].name + ": " + trans[i].amount + "  <br>"
    }
  }
  document.getElementById("transactions").innerHTML = transHTML;
}
