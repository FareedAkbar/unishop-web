import Image from "next/image"
import bKash from "@/public/Bkash.png"
import mCard from "@/public/Mastercard.png"
import nagad from "@/public/Nagad.png"
import tweeterIcon from "@/public/Tweeter.svg"
import visa from "@/public/Visa.png"
import backUp from "@/public/backUp.svg"
import bgSighup from "@/public/bgSighup.png"
import book from "@/public/book.png"
import cap from "@/public/cap.png"
import circle from "@/public/circle.svg"
import coat from "@/public/coat.png"
import delivery from "@/public/delivery.svg"
import echo from "@/public/echo.png"
import fbIcon from "@/public/fb.svg"
import featureCloth from "@/public/featureCloth.png"
import featureShoping from "@/public/featureShoping.png"
import featureStaionry from "@/public/featureStaionry.png"
import featureTextbook from "@/public/featureTextbook.png"
import google from "@/public/google.svg"
import goolgeMap from "@/public/goolgemap.png"
import headphone from "@/public/headPhone.svg"
import hodi from "@/public/hodi.png"
import hodiBack from "@/public/hodiBack.png"
import hodiSide from "@/public/hodiSide.png"
import instagramIcon from "@/public/instagram.svg"
import iPad from "@/public/ipad.png"
import letterSend from "@/public/letterSend.png"
import line from "@/public/line.svg"
import paper from "@/public/paper.png"
import paypal from "@/public/payPal.png"
import registerLogo from "@/public/resisterLogo.png"
import sendHorizone from "@/public/sendHorizon.svg"
import smallCircle from "@/public/smallCircle.svg"
import trackingBg from "@/public/trackingBg.png"
import logo from "@/public/unishop.png"
import withoutBg from "@/public/without-bg.png"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  CreditCard,
  Eye,
  Facebook,
  Globe,
  Heart,
  HelpCircle,
  Instagram,
  Linkedin,
  LucideProps,
  Mail,
  Map,
  MapPin,
  Menu,
  Minus,
  Moon,
  MoreHorizontal,
  PhoneCall,
  Plus,
  RefreshCcw,
  Search,
  ShoppingBagIcon,
  SlidersHorizontal,
  Star,
  SunMedium,
  Trash2,
  Twitter,
  TwitterIcon,
  UserIcon,
  X,
  type Icon as LucideIcon,
} from "lucide-react"

export type Icon = LucideIcon

export const Icons = {
  sun: SunMedium,
  moon: Moon,
  twitter: Twitter,
  delivery: delivery,
  backUp: backUp,
  search: Search,
  phoneCall: PhoneCall,
  mail: Mail,
  mapPin: MapPin,
  menu: Menu,
  globe: Globe,
  heart: Heart,
  ShoppingBagIcon: ShoppingBagIcon,
  x: X,
  eye: Eye,
  chevronRight: ChevronRight,
  star: Star,
  arrowLeft: ArrowLeft,
  fb: Facebook,
  Twitter: TwitterIcon,
  instagram: Instagram,
  linkedin: Linkedin,
  check: Check,
  plus: Plus,
  minus: Minus,
  refresh: RefreshCcw,
  more: MoreHorizontal,
  slidersHorizontal: SlidersHorizontal,
  arrowRight: ArrowRight,
  creditCard: CreditCard,
  helpCircle: HelpCircle,
  mapPinned: Map,
  profile: UserIcon,
  delete: Trash2,
  gitHub: (props: LucideProps) => (
    <svg viewBox="0 0 438.549 438.549" {...props}>
      <path
        fill="currentColor"
        d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
      ></path>
    </svg>
  ),
  lines: (props: LucideProps) => (
    <svg width="200" height="200">
      <line x1="10" y1="10" x2="190" y2="10" stroke="black" strokeWidth="2" />
    </svg>
  ),
  logo: (props: LucideProps) => (
    <Image src={logo} alt="Logo" className={props.className} />
  ),
  iPad: (props: LucideProps) => (
    <Image src={iPad} alt="Product Image" className={props.className} />
  ),
  cap: (props: LucideProps) => (
    <Image src={cap} alt="Product Image" className={props.className} />
  ),
  coat: (props: LucideProps) => (
    <Image src={coat} alt="Product Image" className={props.className} />
  ),
  paper: (props: LucideProps) => (
    <Image src={paper} alt="Product Image" className={props.className} />
  ),
  echo: (props: LucideProps) => (
    <Image src={echo} alt="Product Image" className={props.className} />
  ),
  book: (props: LucideProps) => (
    <Image src={book} alt="Product Image" className={props.className} />
  ),
  sendHorizone: (props: LucideProps) => (
    <Image src={sendHorizone} alt="Product Image" className={props.className} />
  ),
  registerLogo: (props: LucideProps) => (
    <Image src={registerLogo} alt="Product Image" className={props.className} />
  ),
  hodi: (props: LucideProps) => (
    <Image src={hodi} alt="Product Image" className={props.className} />
  ),
  hodiBack: (props: LucideProps) => (
    <Image src={hodiBack} alt="Product Image" className={props.className} />
  ),
  hodiSide: (props: LucideProps) => (
    <Image src={hodiSide} alt="Product Image" className={props.className} />
  ),
  fbIcon: (props: LucideProps) => (
    <Image src={fbIcon} alt="Product Image" className={props.className} />
  ),
  tweeterIcon: (props: LucideProps) => (
    <Image src={tweeterIcon} alt="Product Image" className={props.className} />
  ),
  line: (props: LucideProps) => (
    <Image src={line} alt="line" className={props.className} />
  ),
  circle: (props: LucideProps) => (
    <Image src={circle} alt="line" className={props.className} />
  ),
  smallCircle: (props: LucideProps) => (
    <Image src={smallCircle} alt="line" className={props.className} />
  ),
  bKash: (props: LucideProps) => (
    <Image src={bKash} alt="line" className={props.className} />
  ),
  visa: (props: LucideProps) => (
    <Image src={visa} alt="line" className={props.className} />
  ),
  mCard: (props: LucideProps) => (
    <Image src={mCard} alt="line" className={props.className} />
  ),
  nagad: (props: LucideProps) => (
    <Image src={nagad} alt="line" className={props.className} />
  ),
  google: (props: LucideProps) => (
    <Image src={google} alt="line" className={props.className} />
  ),
  paypal: (props: LucideProps) => (
    <Image src={paypal} alt="line" className={props.className} />
  ),
  trackingBg: (props: LucideProps) => (
    <Image src={trackingBg} alt="line" className={props.className} />
  ),
  instagramIcon: (props: LucideProps) => (
    <Image
      src={instagramIcon}
      alt="Product Image"
      className={props.className}
    />
  ),

  withoutBg: (props: LucideProps) => (
    <Image src={withoutBg} alt="Product Image" className={props.className} />
  ),
  goolgeMap: (props: LucideProps) => (
    <Image src={goolgeMap} alt="Product Image" className={props.className} />
  ),
  letterSend: (props: LucideProps) => (
    <Image src={letterSend} alt="Product Image" className={props.className} />
  ),
  featureCloth: (props: LucideProps) => (
    <Image src={featureCloth} alt="Product Image" className={props.className} />
  ),
  bgSighup: (props: LucideProps) => (
    <Image src={bgSighup} alt="Product Image" className={props.className} />
  ),
  featureShoping: (props: LucideProps) => (
    <Image
      src={featureShoping}
      alt="Product Image"
      className={props.className}
    />
  ),
  featureStaionry: (props: LucideProps) => (
    <Image
      src={featureStaionry}
      alt="Product Image"
      className={props.className}
    />
  ),
  featureTextbook: (props: LucideProps) => (
    <Image
      src={featureTextbook}
      alt="Product Image"
      className={props.className}
    />
  ),
  headphone: (props: LucideProps) => (
    <Image src={headphone} alt="Image" className={props.className} />
  ),
}
