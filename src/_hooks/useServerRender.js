import { useEffect, useState } from "react"

export const useServerRender = () => {
    const [isServer, setIsServerSide] = useState(false)
    useEffect(() => void setIsServerSide(true), [])
    return { isServer }
}