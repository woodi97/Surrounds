import React, { FC, memo } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { BiVideo } from 'react-icons/bi'
import { BsApple, BsCamera, BsGoogle, BsHouseDoor, BsPlus } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import { FaSearch } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { IoAlbumsOutline, IoEllipsisVertical, IoPeopleOutline } from 'react-icons/io5'
import { RiKakaoTalkFill } from 'react-icons/ri'
import { FiSettings } from 'react-icons/fi'

export type SVGTypes =
  | 'house'
  | 'setting'
  | 'plus'
  | 'plusCircle'
  | 'profile'
  | 'album'
  | 'camera'
  | 'video'
  | 'hamburger'
  | 'search'
  | 'leftArrow'
  | 'rightArrow'
  | 'ellipsisVertical'
  | 'people'
  | 'google'
  | 'apple'
  | 'kakao'

type IconProps = {
  name: SVGTypes
  size?: number
  className?: string
}

const _Selector: { [key in SVGTypes]: FC<IconProps> } = {
  house: BsHouseDoor,
  setting: FiSettings,
  plus: BsPlus,
  plusCircle: AiOutlinePlusCircle,
  profile: CgProfile,
  album: IoAlbumsOutline,
  camera: BsCamera,
  video: BiVideo,
  hamburger: GiHamburgerMenu,
  search: FaSearch,
  leftArrow: IoIosArrowBack,
  rightArrow: IoIosArrowForward,
  ellipsisVertical: IoEllipsisVertical,
  people: IoPeopleOutline,
  google: BsGoogle,
  apple: BsApple,
  kakao: RiKakaoTalkFill,
}

const Icon: FC<IconProps> = ({ name, ...props }) => {
  const IconComponent = _Selector[name]
  return <IconComponent className="pointer-events-none" name={name} {...props} />
}

export default memo(Icon)