import React from 'react'
import ContentLoader from 'react-content-loader'

const AvatarLoader = props => {
  return (
    <ContentLoader
      height={54}
      width={105}
      viewBox="0 0 104 54"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      backgroundOpacity="0.07"
      {...props}
    >
      <circle cx="27" cy="27" r="18" />
        <rect x="53" y="20" rx="3" ry="3" width="80" height="13" />
        {/* <rect x="53" y="30" rx="3" ry="3" width="10" height="10" /> */}
        {/* <rect x="67" y="30" rx="3" ry="3" width="74" height="10" /> */}
      <circle cx="305" cy="27" r="8" />
      {/* <rect x="0" y="53" rx="0" ry="0" width="320" height="1" /> */}
      {/* <rect x="219" y="146" rx="0" ry="0" width="0" height="0" /> */}
    </ContentLoader>
  )
}

AvatarLoader.metadata = {
  name: 'Marius Jørgensen',
  github: 'marjorg',
  description: 'A singular Snapchat conversation',
  filename: 'SnapchatThread',
}

export default AvatarLoader