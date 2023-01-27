import { useRouter } from 'next/router'
import React from 'react'

const LoaderSection = () => {
    const { asPath } = useRouter()
    return (
        <>
            <div className={`loader-container ${asPath.includes('/news/')&&'total-height'}`}>
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>

        </>
    )
}

export default LoaderSection
