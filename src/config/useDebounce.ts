import * as React from 'react'

const DEFAULT_DEBOUNCE_TIME_MS = 200

export const useDebounce = <T> (value: T, delayMs: number = DEFAULT_DEBOUNCE_TIME_MS) => {
    const [debounceValue, setDebounceValue] = React.useState<T>(value)

    React.useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value)
        }, delayMs)

        return () => clearTimeout(handler)
    }, [value, delayMs])

    return debounceValue
}
