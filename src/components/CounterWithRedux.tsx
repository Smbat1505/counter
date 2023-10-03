// TODO Компонент предоставляет счетчик с возможностью настройки максимального и начального значений. Пользователь может увеличивать значение счетчика на 1, сбрасывать его до начального значения, а также устанавливать новые значения с помощью настроек. В случае некорректных значений (например, когда начальное значение превышает максимальное или меньше нуля) отображается сообщение об ошибке. Также есть кнопка "Reset", которая полностью сбрасывает счетчик и настройки.


import React, {useCallback, useEffect, useState} from 'react';
import './counter.css';
import reset from './../img/reset.svg';
import {Button} from "./button/Button";
import {UniversalInput} from "./input/UniversalInput";
import {useDispatch, useSelector} from "react-redux";
import {
    countType,
    IncrementAC,
    InitialStateType,
    MaxValueChangeAC, maxValueType,
    ResetAC, ResetAllAC, SetCountAC,
    StartValueChangeAC, startValueType
} from "../reducer/reducerForCounter";
import {AppRootStateType} from "../reducer/store";


const Counter = () => {

    const count = useSelector<AppRootStateType, countType>(state => state.count);
    const startValue = useSelector<AppRootStateType, startValueType>(state => state.startValue);
    const maxValue = useSelector<AppRootStateType, maxValueType>(state => state.maxValue);
    const dispatch = useDispatch();
    // const {maxValue, startValue, count} = useSelector<AppRootStateType, InitialStateType>(
    //     (state) => state
    // );


    const [showSettings, setShowSettings] = useState(false); // Состояние для переключения отображения настроек

    const [inputEmpty, setInputEmpty] = useState(false);


    // Проверяем наличие сохраненных данных в localStorage
    useEffect(() => {
        const storedCountValue = localStorage.getItem('countValue');
        const storedMaxValue = localStorage.getItem('maxValue');
        const storedStartValue = localStorage.getItem('startValue');

        if (storedMaxValue) {
            dispatch(MaxValueChangeAC(parseInt(storedMaxValue, 10)));
        }

        if (storedStartValue) {
            dispatch(StartValueChangeAC(parseInt(storedStartValue, 10)));
        }

        if (storedCountValue) {
            dispatch(SetCountAC(parseInt(storedCountValue, 10)));
        }
    }, [dispatch]);

    // Сохраняем значения в localStorage при их изменении
    useEffect(() => {
        localStorage.setItem('countValue', JSON.stringify(count));
    }, [count]);

    useEffect(() => {
        localStorage.setItem('maxValue', JSON.stringify(maxValue));
    }, [maxValue]);

    useEffect(() => {
        localStorage.setItem('startValue', JSON.stringify(startValue));
    }, [startValue]);


    const handleIncrement = useCallback(() => {
        if (count < maxValue) {
            dispatch(IncrementAC());
        }
    }, [dispatch]);

    const handleReset = useCallback(() => {
        dispatch(ResetAC()); // Функция для сброса счетчика до начального значения
    }, [dispatch]);

    const handleMaxValueChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.currentTarget.value, 10);
        dispatch(MaxValueChangeAC(value)); // Функция для обработки изменения максимального значения в поле ввода


        // Проверяем, является ли поле пустым и устанавливаем состояние
        setInputEmpty(event.currentTarget.value === '');
    }, [dispatch]);

    const handleStartValueChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.currentTarget.value, 10);
        dispatch(StartValueChangeAC(value)); // Функция для обработки изменения начального значения в поле ввода

        // Проверяем, является ли поле пустым и устанавливаем состояние
        setInputEmpty(event.currentTarget.value === '');
    }, [dispatch]);

    const handleSet = useCallback(() => {
        if (startValue >= maxValue || startValue < 0) {
            // Обработка ошибки
        } else {
            dispatch(ResetAC()); // Сброс счетчика до начального значения
        }
        setShowSettings(false)
    }, [dispatch, setShowSettings]);

    const handleHiddenSettings = useCallback(() => {
        setShowSettings(prevShowSettings => !prevShowSettings); // Функция для переключения отображения настроек
    }, [setShowSettings]);

    const handleResetOll = useCallback(() => {
        // Функция для сброса счетчика, максимального и начального значений в их исходные значения
        dispatch(ResetAllAC())
        // Скрыть раздел настроек после сброса
        setShowSettings(false);
    }, [dispatch, setShowSettings]);

    const errorValue = startValue >= maxValue || startValue < 0; // Проверка наличия ошибки во входных значениях
    const countMaxValue = count === maxValue; // Проверка, достигло ли значение счетчика максимального значения

    const noStartValue = !startValue && startValue !== 0;  // if not value
    const noMaxValue = isNaN(Number(maxValue)) || Number(maxValue) === 0;

    const inputError = errorValue || inputEmpty ? 'error' : undefined; // Имя класса для обозначения ошибки в полях ввода

    return (
        <div className={'counter-box'}>
            {/* Раздел экрана счетчика */}
            <div className={'counter-screen '}>

                {/* Вывод текущего значения счетчика или сообщения об ошибке */}

                {
                    errorValue ?
                        <h2 className={'errors-value'}>
                            <em>Invalid value, start value must not exceed the maximum, start or maximum cannot be less
                                than 0</em>
                        </h2>
                        : noStartValue && noMaxValue ?
                            <h2 className={noStartValue && noMaxValue ? 'red' : undefined}>Values are required</h2>
                            : noStartValue ? <h2 className={noStartValue ? 'red' : undefined}>Start value is required</h2>
                                : noMaxValue ? <h2 className={noMaxValue ? 'red' : undefined}>Max value is required</h2> // Добавлено условие для вывода "Max value is required"
                                    : countMaxValue ? <h2 className={'red'}>Max value reached</h2>  // Добавлено условие для вывода "Max value reached"
                                        : <h2>{count}</h2>
                }


                <hr/>
                {/* Кнопки увеличения и сброса значения счетчика */}
                <div className={'counter-batten-section'}>
                    <Button
                        onClick={handleIncrement}
                        disabled={count === maxValue || errorValue}
                    >Increment</Button>
                    <Button
                        onClick={handleReset}
                        disabled={errorValue}
                    >Reset</Button>
                </div>

            </div>

            {/* Раздел настроек и управления */
            }
            <div className={'controls'}>
                {/* Кнопка для отображения/скрытия раздела настроек */}
                <span
                    className={'settings'}
                    onClick={handleHiddenSettings}
                >
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30">
                    <path
                        d="M 15 2 C 14.448 2 14 2.448 14 3 L 14 3.171875 C 14 3.649875 13.663406 4.0763437 13.191406 4.1523438 C 12.962406 4.1893437 12.735719 4.2322031 12.511719 4.2832031 C 12.047719 4.3892031 11.578484 4.1265 11.396484 3.6875 L 11.330078 3.53125 C 11.119078 3.02125 10.534437 2.7782344 10.023438 2.9902344 C 9.5134375 3.2012344 9.2704219 3.785875 9.4824219 4.296875 L 9.5488281 4.4570312 C 9.7328281 4.8970313 9.5856875 5.4179219 9.1796875 5.6699219 C 8.9836875 5.7919219 8.7924688 5.9197344 8.6054688 6.0527344 C 8.2174688 6.3297344 7.68075 6.2666875 7.34375 5.9296875 L 7.2226562 5.8085938 C 6.8316562 5.4175937 6.1985937 5.4175938 5.8085938 5.8085938 C 5.4185938 6.1995938 5.4185938 6.8326563 5.8085938 7.2226562 L 5.9296875 7.34375 C 6.2666875 7.68075 6.3297344 8.2164688 6.0527344 8.6054688 C 5.9197344 8.7924687 5.7919219 8.9836875 5.6699219 9.1796875 C 5.4179219 9.5856875 4.8960781 9.7337812 4.4550781 9.5507812 L 4.296875 9.484375 C 3.786875 9.273375 3.2002813 9.5153906 2.9882812 10.025391 C 2.7772813 10.535391 3.0192969 11.120031 3.5292969 11.332031 L 3.6855469 11.396484 C 4.1245469 11.578484 4.3892031 12.047719 4.2832031 12.511719 C 4.2322031 12.735719 4.1873906 12.962406 4.1503906 13.191406 C 4.0753906 13.662406 3.649875 14 3.171875 14 L 3 14 C 2.448 14 2 14.448 2 15 C 2 15.552 2.448 16 3 16 L 3.171875 16 C 3.649875 16 4.0763437 16.336594 4.1523438 16.808594 C 4.1893437 17.037594 4.2322031 17.264281 4.2832031 17.488281 C 4.3892031 17.952281 4.1265 18.421516 3.6875 18.603516 L 3.53125 18.669922 C 3.02125 18.880922 2.7782344 19.465563 2.9902344 19.976562 C 3.2012344 20.486563 3.785875 20.729578 4.296875 20.517578 L 4.4570312 20.451172 C 4.8980312 20.268172 5.418875 20.415312 5.671875 20.820312 C 5.793875 21.016313 5.9206875 21.208484 6.0546875 21.396484 C 6.3316875 21.784484 6.2686406 22.321203 5.9316406 22.658203 L 5.8085938 22.779297 C 5.4175937 23.170297 5.4175938 23.803359 5.8085938 24.193359 C 6.1995938 24.583359 6.8326562 24.584359 7.2226562 24.193359 L 7.3457031 24.072266 C 7.6827031 23.735266 8.2174688 23.670266 8.6054688 23.947266 C 8.7934688 24.081266 8.9856406 24.210031 9.1816406 24.332031 C 9.5866406 24.584031 9.7357344 25.105875 9.5527344 25.546875 L 9.4863281 25.705078 C 9.2753281 26.215078 9.5173438 26.801672 10.027344 27.013672 C 10.537344 27.224672 11.121984 26.982656 11.333984 26.472656 L 11.398438 26.316406 C 11.580438 25.877406 12.049672 25.61275 12.513672 25.71875 C 12.737672 25.76975 12.964359 25.814562 13.193359 25.851562 C 13.662359 25.924562 14 26.350125 14 26.828125 L 14 27 C 14 27.552 14.448 28 15 28 C 15.552 28 16 27.552 16 27 L 16 26.828125 C 16 26.350125 16.336594 25.923656 16.808594 25.847656 C 17.037594 25.810656 17.264281 25.767797 17.488281 25.716797 C 17.952281 25.610797 18.421516 25.8735 18.603516 26.3125 L 18.669922 26.46875 C 18.880922 26.97875 19.465563 27.221766 19.976562 27.009766 C 20.486563 26.798766 20.729578 26.214125 20.517578 25.703125 L 20.451172 25.542969 C 20.268172 25.101969 20.415312 24.581125 20.820312 24.328125 C 21.016313 24.206125 21.208484 24.079312 21.396484 23.945312 C 21.784484 23.668312 22.321203 23.731359 22.658203 24.068359 L 22.779297 24.191406 C 23.170297 24.582406 23.803359 24.582406 24.193359 24.191406 C 24.583359 23.800406 24.584359 23.167344 24.193359 22.777344 L 24.072266 22.654297 C 23.735266 22.317297 23.670266 21.782531 23.947266 21.394531 C 24.081266 21.206531 24.210031 21.014359 24.332031 20.818359 C 24.584031 20.413359 25.105875 20.264266 25.546875 20.447266 L 25.705078 20.513672 C 26.215078 20.724672 26.801672 20.482656 27.013672 19.972656 C 27.224672 19.462656 26.982656 18.878016 26.472656 18.666016 L 26.316406 18.601562 C 25.877406 18.419563 25.61275 17.950328 25.71875 17.486328 C 25.76975 17.262328 25.814562 17.035641 25.851562 16.806641 C 25.924562 16.337641 26.350125 16 26.828125 16 L 27 16 C 27.552 16 28 15.552 28 15 C 28 14.448 27.552 14 27 14 L 26.828125 14 C 26.350125 14 25.923656 13.663406 25.847656 13.191406 C 25.810656 12.962406 25.767797 12.735719 25.716797 12.511719 C 25.610797 12.047719 25.8735 11.578484 26.3125 11.396484 L 26.46875 11.330078 C 26.97875 11.119078 27.221766 10.534437 27.009766 10.023438 C 26.798766 9.5134375 26.214125 9.2704219 25.703125 9.4824219 L 25.542969 9.5488281 C 25.101969 9.7318281 24.581125 9.5846875 24.328125 9.1796875 C 24.206125 8.9836875 24.079312 8.7915156 23.945312 8.6035156 C 23.668312 8.2155156 23.731359 7.6787969 24.068359 7.3417969 L 24.191406 7.2207031 C 24.582406 6.8297031 24.582406 6.1966406 24.191406 5.8066406 C 23.800406 5.4156406 23.167344 5.4156406 22.777344 5.8066406 L 22.65625 5.9296875 C 22.31925 6.2666875 21.782531 6.3316875 21.394531 6.0546875 C 21.206531 5.9206875 21.014359 5.7919219 20.818359 5.6699219 C 20.413359 5.4179219 20.266219 4.8960781 20.449219 4.4550781 L 20.515625 4.296875 C 20.726625 3.786875 20.484609 3.2002812 19.974609 2.9882812 C 19.464609 2.7772813 18.879969 3.0192969 18.667969 3.5292969 L 18.601562 3.6855469 C 18.419563 4.1245469 17.950328 4.3892031 17.486328 4.2832031 C 17.262328 4.2322031 17.035641 4.1873906 16.806641 4.1503906 C 16.336641 4.0753906 16 3.649875 16 3.171875 L 16 3 C 16 2.448 15.552 2 15 2 z M 15 7 C 19.078645 7 22.438586 10.054876 22.931641 14 L 16.728516 14 A 2 2 0 0 0 15 13 A 2 2 0 0 0 14.998047 13 L 11.896484 7.625 C 12.850999 7.222729 13.899211 7 15 7 z M 10.169922 8.6328125 L 13.269531 14 A 2 2 0 0 0 13 15 A 2 2 0 0 0 13.269531 15.996094 L 10.167969 21.365234 C 8.2464258 19.903996 7 17.600071 7 15 C 7 12.398945 8.2471371 10.093961 10.169922 8.6328125 z M 16.730469 16 L 22.931641 16 C 22.438586 19.945124 19.078645 23 15 23 C 13.899211 23 12.850999 22.777271 11.896484 22.375 L 14.998047 17 A 2 2 0 0 0 15 17 A 2 2 0 0 0 16.730469 16 z"></path>
                </svg>
            </span>


                {/* Кнопка для полного сброса счетчика и настроек */}
                <span
                    className={'resets'}
                    onClick={handleResetOll}
                >
                    {/*<img src={reset} alt="Reset"/>*/}
                    <span className="material-symbols-outlined">restart_alt</span>
                </span>
            </div>

            {/* Раздел с настройками */
            }
            {
                showSettings && (
                    <div className={'counter-settings'}>
                        <h2>Settings:</h2>
                        <div className={'counter-input'}>
                            {/* Поле ввода максимального значения */}
                            <UniversalInput
                                label=" Max Value"
                                type="number"
                                value={maxValue}
                                onChange={handleMaxValueChange}
                                className={inputError}
                                placeholder={' Max Value'}

                            />

                            {/* Поле ввода начального значения */}
                            <UniversalInput
                                label="  Start Value"
                                type="number"
                                value={startValue}
                                onChange={handleStartValueChange}
                                className={inputError}
                                placeholder={' Start Value'}

                            />
                        </div>
                        <div className={'counter-input'}>

                            <Button
                                onClick={handleSet}
                                className={''}
                                onKeyDown={() => {
                                }}
                                disabled={(noMaxValue || noStartValue) || (startValue >= maxValue || startValue < 0)}
                            >
                                Set
                            </Button>
                        </div>
                    </div>
                )
            }
        </div>
    )
};

export default Counter;