const defaultAttributeMap = {
    'goals': 6,
    'goal_assist': 3,
    'blocked_scoring_att': 0.5,
    'goals_conceded': 0.5,
    'interception': 0.3,
    'won_tackle': 0.5,
    'last_man_tackle': 3,
    'penalty_conceded': -3,
    'attempted_tackle_foul': 0.5,
    'yellow_card': -1,
    'red_card': -3,
    'own_goals': -2,
    'goals_conceded_ibox': -0.75,
    'goals_conceded_obox': -0.25
}

let attributeMap = JSON.parse(JSON.stringify(defaultAttributeMap));

function createAttributeNodes(attributeMap) {
    const attributesElem = document.getElementById("attributes");
    for (let attributeName in attributeMap) {
        const node = document.createElement("li");
        const textNode = document.createTextNode(attributeName)
        const input = document.createElement('input');
        input.type = "text";
        input.value = attributeMap[attributeName];
        input.name = attributeName
        node.appendChild(textNode);
        node.appendChild(input);
        attributesElem.appendChild(node);
    }
}

function toggleAttributeList() {
    $('#attributesContainer').toggle();
}

function filterDefenders() {
    const defenders = []
    for (let i =0; i < data.length; i++) {
        if (data[i]["player"]["info"]["position"] == "D") {
            defenders.push(data[i]);
        }
    }
    return defenders;
}

function calculateScore(defender) {
    let score = 0;
    for(let key in attributeMap) {
        if (key in defender["stats"]) {
            score += (attributeMap[key] * defender["stats"][key])
        }
    }
    return score;
}

function calcualteScoreAndSort(defenders) {
    const finalOrder = [];
    for (let i = 0; i < defenders.length; i++) {
        finalOrder.push({
            "name": defenders[i]["player"]["name"]["display"],
            "score": calculateScore(defenders[i])
        });
    }
    finalOrder.sort((a, b) => b["score"] - a["score"]);
    return finalOrder;
}

function readMap() {
    for(let attributeName in attributeMap) {
        const attributeVal = document.getElementsByName(attributeName)[0].value;
        if(isNaN(attributeVal)) {
            attributeVal = 0;
        }
        attributeMap[attributeName] = parseFloat(attributeVal);
    }
}

function resetMap() {
    for(let attributeName in attributeMap) {
        const attributeElem = document.getElementsByName(attributeName)[0];
        attributeElem.value = attributeMap[attributeName];
    }
}

function reset() {
    attributeMap = JSON.parse(JSON.stringify(defaultAttributeMap));
    clearTable();
    resetMap();
}

function calculateOrder() {
    const defenders = filterDefenders();
    readMap();
    const finalOrder = calcualteScoreAndSort(defenders);
    clearTable();
    renderTable(finalOrder);
}

function clearTable() {
    const orderingContainer = document.getElementById("orderingContainer");
    orderingContainer.innerHTML = "";
}

function renderTable(finalOrder) {
    const orderingContainer = document.getElementById("orderingContainer");
    const table = document.createElement("table");
    const thead = renderHead();
    table.appendChild(thead);
    const tbody = renderBody(finalOrder);
    table.appendChild(tbody);
    orderingContainer.appendChild(table)
}

function renderHead() {
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    const th1 = document.createElement("th");
    const th2 = document.createElement("th");
    const th3 = document.createElement("th");
    const name = document.createTextNode("Name");
    const score = document.createTextNode("Score");
    const rank = document.createTextNode("Rank");
    th1.appendChild(rank);
    th2.appendChild(name);
    th3.appendChild(score);
    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    thead.appendChild(tr);
    return thead
}

function renderBody(finalOrder) {
    const tbody = document.createElement("tbody");

    for(let i = 0; i < Math.min(finalOrder.length, 50); i++) {
        const tr = document.createElement("tr");
        const th = document.createElement("th");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const name = document.createTextNode(finalOrder[i]["name"]);
        const score = document.createTextNode(finalOrder[i]["score"]);
        const rank = document.createTextNode(i+1);
        th.appendChild(rank);
        td1.appendChild(name);
        td2.appendChild(score);
        tr.appendChild(th);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tbody.appendChild(tr);    
    }
    return tbody;
}

createAttributeNodes(attributeMap)