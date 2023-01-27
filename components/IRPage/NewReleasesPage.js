import React, { useEffect, useState } from 'react'
import NewsCard from './NewsCard'
import Image from "next/image"
import SearchSection from './SearchSeaction'
import LoaderSection from '../common/LoaderSection'
import MediaItems from './MediaItems'
import Pageination from './Pageination'
import { useTranslation } from 'next-i18next';
const NewReleasesPage = ({ mediaData, newReleaseIsLoading }) => {
  const { t } = useTranslation('common');
  const [media, setMedia] = useState()
  const [message, setMessage] = useState()
  useEffect(() => {
    setMedia(mediaData)
  }, [mediaData])

  return (
    <>
      {/* filter */}
      <div className='new-release-filter'>
        <SearchSection mediaData={mediaData} setMedia={setMedia} setMessage={setMessage} />
      </div>
      {/* newRelease section */}
      <div className='new-releases-section' id='new-releases'>
        <div className='new-releases-header'>
        {t('investor.new_releases')}
        </div>
        {media == 'empty' ?
          <h1 className='new-releases-header' style={{ color: 'black' }}>
            {t('investor.no_matching')}
          </h1>
          :
          !newReleaseIsLoading && media ?
            media.length >= 10 ?
              <Pageination media={media} /> :
              <div className='news'>
               <MediaItems currentItems={media}/>
              </div>
            :
            <LoaderSection />
        }
      </div>
    </>
  )
}

export default NewReleasesPage