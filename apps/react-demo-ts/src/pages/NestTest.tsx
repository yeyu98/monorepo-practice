import React, { useEffect } from 'react'

interface Props {}

function NestTest(props: Props) {
    const {} = props

    useEffect(() => {
        const eventSource = new EventSource('http://localhost:3000/stream')
        eventSource.addEventListener('message', ({data}: {data: string}) => {
            console.log(JSON.parse(data).msg)
        })
    }, [])

    return (
        <>
            <h1>Nest SSE Test</h1>
        </>
    )
}

export default NestTest
