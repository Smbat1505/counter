// TODO Компонент предоставляет счетчик с возможностью настройки максимального и начального значений. Пользователь может увеличивать значение счетчика на 1, сбрасывать его до начального значения, а также устанавливать новые значения с помощью настроек. В случае некорректных значений (например, когда начальное значение превышает максимальное или меньше нуля) отображается сообщение об ошибке. Также есть кнопка "Reset", которая полностью сбрасывает счетчик и настройки.


import React, {useCallback, useEffect, useState} from 'react';
import styles from '../App.module.css'
import reset from '../img/reloading.png';
import settings from '../img/setting.png'
import theme from '../img/theme.png'
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


    const [showSettings, setShowSettings] = useState<boolean>(false); // Состояние для переключения отображения настроек

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
        console.log('increment rendered')
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
        console.log('rendered Set')
        // if (startValue >= maxValue || startValue < 0) {
        //     // Обработка ошибки
        // } else {
            dispatch(ResetAC()); // Сброс счетчика до начального значения
        // }
        setShowSettings(false)
    }, [startValue, maxValue]);

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

    const inputError = errorValue || inputEmpty ? styles.counter_error : undefined; // Имя класса для обозначения ошибки в полях ввода

    const [darkMode, setDarkMode] = useState(false);
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={styles.counter_box}>
            {/* Раздел экрана счетчика */}
            <div className={styles.counter_screen}>

                {/* Вывод текущего значения счетчика или сообщения об ошибке */}

                {
                    errorValue ?
                        <h2 className={styles.counter_errorsVal}>
                            <em>Invalid value, start value must not exceed the maximum, start or maximum cannot be less
                                than 0</em>
                        </h2>
                        : noStartValue && noMaxValue ?
                            <h2 className={noStartValue && noMaxValue ? styles.counter_errorsVal : undefined}>Values are
                                required</h2>
                            : noStartValue ?
                                <h2 className={noStartValue ? styles.counter_errorsVal : undefined}>Start value is required</h2>
                                : noMaxValue ?
                                    <h2 className={noMaxValue ? styles.counter_errorsVal : undefined}>Max value is required</h2> // Добавлено условие для вывода "Max value is required"
                                    : countMaxValue ? <h2 className={styles.counter_errorsVal}>Max value reached</h2>  // Добавлено условие для вывода "Max value reached"
                                        : <h2>{count}</h2>
                }


                <hr/>
                {/* Кнопки увеличения и сброса значения счетчика */}
                <div className={styles.counter_buttonSection}>
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
            <div className={styles.counter_controlsBlock}>

                <div className={styles.counter_controls}>
                    {/* Кнопка для отображения/скрытия раздела настроек */}
                    <div
                        className={styles.counter_controls_settings}
                        onClick={handleHiddenSettings}
                    >
                        <img src={settings} alt="settings" className={styles.materialSymbolsOutline}/>

                    </div>


                    {/* Кнопка для полного сброса счетчика и настроек */}
                    <div className={styles.counter_controls_resets} onClick={handleResetOll}>
                        <img src={reset} alt="default values" className={styles.materialSymbolsOutline}/>
                    </div>
                </div>
                <div onClick={toggleDarkMode}
                     className={`${styles.counter_theme} ${darkMode ? styles.dark : styles.light}`}>
                    <img src={theme} alt="default values" className={styles.materialSymbolsOutline}/>
                    {/*<h1>{darkMode ? 'Dark Theme' : 'Light Theme'}</h1>*/}
                </div>

            </div>


            {/* Раздел с настройками */
            }
            {
                showSettings && (
                    <div className={styles.counter_settings}>
                        <h2>Settings:</h2>
                        <div className={styles.counter_input}>
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
                        <div className={styles.counter_buttonSection}>
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
