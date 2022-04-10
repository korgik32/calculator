onload = () => {

    let arrayButtons = document.querySelectorAll(".calc__button");
    let arrayNumbers = [];
    for (elem in arrayButtons) {
        elem = addEventListener("click", add);
    }

    function add(elem) {
        let tempId = elem.target.id;
        if (arrayNumbers.indexOf("Неправильный ввод") != -1)
            clearArrayNumbers(arrayNumbers);
        switch (tempId) {

            case 'button-1':
                //добавить символ в массив
                arrayNumbers.push(elem.target.innerHTML);
                //перерисовка дисплея калькулятора
                print(); break;
            case 'button-2':
                //добавить символ в массив
                arrayNumbers.push(elem.target.innerHTML);
                //перерисовка дисплея калькулятора
                print(); break;
            case 'button-3':
                //добавить символ в массив
                arrayNumbers.push(elem.target.innerHTML);
                //перерисовка дисплея калькулятора
                print(); break;
            case 'button-4':
                //добавить символ в массив
                arrayNumbers.push(elem.target.innerHTML);
                //перерисовка дисплея калькулятора
                print(); break;
            case 'button-5':
                //добавить символ в массив
                arrayNumbers.push(elem.target.innerHTML);
                //перерисовка дисплея калькулятора
                print(); break;
            case 'button-6':
                //добавить символ в массив
                arrayNumbers.push(elem.target.innerHTML);
                //перерисовка дисплея калькулятора
                print(); break;
            case 'button-7':
                //добавить символ в массив
                arrayNumbers.push(elem.target.innerHTML);
                //перерисовка дисплея калькулятора
                print(); break;
            case 'button-8':
                //добавить символ в массив
                arrayNumbers.push(elem.target.innerHTML);
                //перерисовка дисплея калькулятора
                print(); break;
            case 'button-9':
                //добавить символ в массив
                arrayNumbers.push(elem.target.innerHTML);
                //перерисовка дисплея калькулятора
                print(); break;
            case 'button-0':
                //добавить символ в массив
                arrayNumbers.push(elem.target.innerHTML);
                //перерисовка дисплея калькулятора
                print(); break;
            case 'button-.':
                //добавить символ в массив
                arrayNumbers.push(elem.target.innerHTML);
                //перерисовка дисплея калькулятора
                print(); break;
            ///////////////////////////////////////////////////////////////////////////////
            case 'button-C': clearArrayNumbers(arrayNumbers);
                print(); break;
            case 'button-/':
                //добавить символ в массив
                arrayNumbers.push(elem.target.innerHTML);
                //перерисовка дисплея калькулятора
                print(); break;
            case 'button-*':
                //добавить символ в массив
                arrayNumbers.push(elem.target.innerHTML);
                //перерисовка дисплея калькулятора
                print(); break;
            case 'button-%':
                //добавить символ в массив
                arrayNumbers.push(elem.target.innerHTML);
                //перерисовка дисплея калькулятора
                print(); break;
            case 'button-^':
                //добавить символ в массив
                arrayNumbers.push(elem.target.innerHTML);
                //перерисовка дисплея калькулятора
                print(); break;
            case 'button-√':
                //добавить символ в массив
                arrayNumbers.push(elem.target.innerHTML);
                //перерисовка дисплея калькулятора
                print(); break;
            case 'button-+':
                //добавить символ в массив
                arrayNumbers.push(elem.target.innerHTML);
                //перерисовка дисплея калькулятора
                print(); break;
            case 'button--':
                //добавить символ в массив
                arrayNumbers.push(elem.target.innerHTML);
                //перерисовка дисплея калькулятора
                print(); break;
            case 'button-=':
                calculate(arrayNumbers); printLocalStorage(); break;

        }
    }



    function print() {

        let tempString = arrayNumbers.join("");


        //адаптация циферблата
        if (tempString.length > 15 && tempString.length <= 23)
            document.querySelector(".calc__display").style.fontSize = '32px';
        else if (tempString.length > 23)
            document.querySelector(".calc__display").style.fontSize = '27px';
        else if (tempString.length <= 15)
            document.querySelector(".calc__display").style.fontSize = '45px';
        if (screen.width < 900) {
            if (tempString.length > 15 && tempString.length <= 23)
                document.querySelector(".calc__display").style.fontSize = '27px';
            else if (tempString.length > 23)
                document.querySelector(".calc__display").style.fontSize = '22px';
            else if (tempString.length <= 15)
                document.querySelector(".calc__display").style.fontSize = '38px';
        }
        if (screen.width < 700) {
            if (tempString.length > 12 && tempString.length <= 18)
                document.querySelector(".calc__display").style.fontSize = '25px';
            else if (tempString.length > 18)
                document.querySelector(".calc__display").style.fontSize = '20px';
            else if (tempString.length <= 12)
                document.querySelector(".calc__display").style.fontSize = '35px';
        }
        document.querySelector(".calc__display").innerHTML = tempString;


        //проверка на пустоту
        if (!arrayNumbers.length)
            document.querySelector(".calc__display").innerHTML = '0.';

        //вывод локал стореджа

    }

    function printLocalStorage() {
        let tempArray = JSON.parse(localStorage.getItem("history"))
        let logList = document.querySelector(".log__list");
        logList.innerHTML = '';
        tempArray.reverse().forEach((elem) => {
            logList.innerHTML += `<li class="list__item">${elem}</li>`;
        })
    }
    function calculate(arr) {
        let tempFull = arr.join("");

        parser(arr);
        console.log(arr, "calculate");
        let result = [];
        let tempString = arr.join("");
        try {
            result = String(eval(tempString));


        }
        catch (err) {
            console.log('ошибка');
            result = "Неправильный ввод";
            tempFull = '';
        }
        arr.push(`=${result}`);
        //строка со всеми символами

        arr.length = 1;
        arr[0] = result.split("");


        if (!tempFull) {
            tempFull = null;
        }
        else {
            tempFull += `=${result}`;
        }



        saveToLocalStorage(tempFull);
        print();
    }

    // парсим выражение что бы оно посчиталось через eval()
    function parser(arr) {
        let tempArray = arr.slice();

        if (tempArray.indexOf('%') != -1)
            searchPercent(arr);
        if (tempArray.indexOf('√') != -1)
            searchSqrt(arr);
        if (tempArray.indexOf('^') != -1)
            searchPow(arr);

    }


    //Поиск и замена символа корня
    function searchSqrt(arr) {
        let tempArray = arr.slice();

        //парсер для корня
        if (tempArray.indexOf('√') != -1) {
            let posEnd;
            let posBegin = tempArray.indexOf('√');
            //костыль
            let crutch = 0;
            //поставить знак * перед корнем если его нет
            if (tempArray[posBegin - 1] === '0' || tempArray[posBegin - 1] === '1' || tempArray[posBegin - 1] === '2' || tempArray[posBegin - 1] === '3' ||
                tempArray[posBegin - 1] === '4' || tempArray[posBegin - 1] === '5' || tempArray[posBegin - 1] === '6' || tempArray[posBegin - 1] === '7' ||
                tempArray[posBegin - 1] === '8' || tempArray[posBegin - 1] === '9') {
                tempArray.splice(posBegin, 0, "*");
                //костыль
                crutch++;
            }
            //заменить значок корня
            tempArray[posBegin + crutch] = "Math.sqrt(";
            let i = posBegin + 1 + crutch;
            while (1) {
                if (tempArray[i] == '0' || tempArray[i] === '1' || tempArray[i] === '2' || tempArray[i] === '3' ||
                    tempArray[i] === '4' || tempArray[i] === '5' || tempArray[i] === '6' || tempArray[i] === '7' ||
                    tempArray[i] === '8' || tempArray[i] === '9' || tempArray[i] === '.') {
                    i++;
                    posEnd = i;
                    /* console.log("итый элемент", tempArray[i - 1]); */
                }
                else {
                    break;
                }
            }
            /* arrayNumbers = tempArray.slice();
            arrayNumbers.splice(posEnd, 0, ")"); */
            tempArray.forEach((elem, i) => {
                arr[i] = elem;
            })
            arr.splice(posEnd, 0, ")");
            console.log(arrayNumbers.join(""));
        }
        else return;

        return searchSqrt(arr);

    }


    //ПОиск символа проценты
    function searchPercent(arr) {
        let tempArray = arr.slice();
        let tempArray2 = [];
        //парсер для процентов
        if (tempArray.indexOf('%') != -1) {
            let posSpecial, num1 = [], num2 = [];
            let posBegin = tempArray.indexOf('%');
            let counter1 = 0, counter2 = false;
            tempArray2 = tempArray.slice(0, posBegin);

            //считаем выражение идущее до %

            for (let i = tempArray2.length; i > -1; i--) {
                if (tempArray[i] === '-' || tempArray[i] === '+' || tempArray[i] === '*' || tempArray[i] === '√' ||
                    tempArray[i] === '^' || tempArray[i] === '/') {
                    if (tempArray[i - 1] === '0' || tempArray[i - 1] === '1' || tempArray[i - 1] === '2' || tempArray[i - 1] === '3' ||
                        tempArray[i - 1] === '4' || tempArray[i - 1] === '5' || tempArray[i - 1] === '6' || tempArray[i - 1] === '7' ||
                        tempArray[i - 1] === '8' || tempArray[i - 1] === '9' || tempArray[i - 1] === '.') {
                        counter2 = true;
                        posSpecial = i;
                        break;
                    }
                }
            }
            tempArray2 = tempArray2.slice(0, posSpecial);

            parser(tempArray2);
            let tempStr = eval(tempArray2.join(""));
            tempArray.splice(0, posSpecial);
            tempArray.unshift(String(tempStr));
            let tempFirstElemString = String(tempArray[0]);
            let tempFirstElemArray = (tempFirstElemString.split("")).reverse();
            tempArray.splice(0, 1);
            tempFirstElemArray.forEach(elem => {
                tempArray.unshift(elem);
            })
            console.log(tempArray, "Fdsfdsfdsfsdfsdfdsfsd");
            posBegin = tempArray.indexOf('%');
            //парсим уже после того как посчитано то что до %
            for (let i = posBegin - 1; i > -1; i--) {
                console.log(tempArray[i], " counter");
                if (tempArray[i] === '0' || tempArray[i] === '1' || tempArray[i] === '2' || tempArray[i] === '3' ||
                    tempArray[i] === '4' || tempArray[i] === '5' || tempArray[i] === '6' || tempArray[i] === '7' ||
                    tempArray[i] === '8' || tempArray[i] === '9' || tempArray[i] === '.') {
                    //тут надо что то делать
                    console.log(tempArray[i], " внутри");
                    if (counter1 == 0) {
                        num2.unshift(tempArray[i]);
                    }
                    if (counter1 == 1) {
                        num1.unshift(tempArray[i]);
                    }
                }
                else {
                    counter1++;
                };

            }
            tempArray[posBegin] = `/100*${num1.join("")}`;
            console.log(num1);
            console.log(num2);

            /* for (let i = arr.length; i > 0; i--) {
                let sex = arr.pop();
            } */
            arr.length = 1;
            tempArray.forEach((elem, i) => {
                arr[i] = elem;
            })
        }
        else return;

        return searchPercent(arr);
    }


    //поиск и замена возведения в степень
    function searchPow(arr) {
        let tempArray = arr.slice();
        //парсер для степени
        if (tempArray.indexOf('^') != -1) {
            let posEnd;
            let posBegin = tempArray.indexOf('^');
            tempArray[posBegin] = "**(";
            let i = posBegin + 1;
            while (1) {
                if (tempArray[i] == '0' || tempArray[i] === '1' || tempArray[i] === '2' || tempArray[i] === '3' ||
                    tempArray[i] === '4' || tempArray[i] === '5' || tempArray[i] === '6' || tempArray[i] === '7' ||
                    tempArray[i] === '8' || tempArray[i] === '9' || tempArray[i] === '.') {
                    i++;
                    posEnd = i;
                    /* console.log("итый элемент", tempArray[i - 1]); */
                }
                else {
                    break;
                }
            }

            tempArray.forEach((elem, i) => {
                arr[i] = elem;
            })
            arr.splice(posEnd, 0, ")");

        }
        else return;

        return searchPow(arr);
    }

    function clearArrayNumbers(arr) {
        arr.length = 0;
    }

    function saveToLocalStorage(item) {
        console.log(item);

        if (item == null) return;
        if (localStorage.getItem("history") == null) {
            let tempArray = [];
            tempArray.push(item);
            localStorage.setItem("history", JSON.stringify(tempArray));
        }
        else {
            let tempArray;
            tempArray = JSON.parse(localStorage.getItem("history"));
            localStorage.clear();
            if (tempArray.length > 99) {
                tempArray.push(item);
                tempArray.shift();
                localStorage.setItem("history", JSON.stringify(tempArray));

            }
            else {
                tempArray.push(item);
                localStorage.setItem("history", JSON.stringify(tempArray));

            }
        }



    }

    printLocalStorage();


    document.querySelector(".bi").addEventListener("click", () => {
        document.querySelector(".bi").innerHTML = "";

        document.querySelector(".bi").innerHTML += arrayNumbers;
    })



}