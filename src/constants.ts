import { TbSmartHome } from "react-icons/tb";
import { GrGroup } from "react-icons/gr";
import { GiSettingsKnobs } from "react-icons/gi";
import { Calendar, } from "lucide-react";
import { BadgeDollarSign , Link, House, Settings, LayoutDashboard, Link2, Flame, Code2, TrendingUp, DollarSign} from "lucide-react";
import { IconInvoice } from "@tabler/icons-react";
export const  GLOBAL_LOGO ="https://pbs.twimg.com/profile_images/1792601935737966592/EK42ujXH_400x400.jpg"
export const  BACKEND_URL =  "https://zap-pay.onrender.com"   //"https://pap-4ohb.onrender.com"
 export const WEBSITE_BASE_URL = "https://pay.usezap.xyz/"
 export const  INVOICE_ABB =  "#XWZHZ1JJK"
 export const PUBLIC_IPFS_GATEWAY ="https://ipfs.subsocial.network/ipfs/"
export const  sideBarMenu = [
    {
      title  :  "Home",
      icon :  TbSmartHome,
      link : "/"
    },
    {
        title  :  "Payments",
        icon :  DollarSign,
        link : "/payments"
      },
      {
        title  :  "Payment links",
        icon :  Link,
        link : "/payment-links"
      },
      {
        title  :  "Invoices",
        icon :  IconInvoice,
        link : "/invoices"
      },
      {
        title  :  "Settings",
        icon :  GiSettingsKnobs,
        link : "/settings"
      },
]

export const paymentScheduleDates = [
  {
    title : "Today",
    value : "today"
  },
  {
    title : "Tomorrow",
    value : "tomorrow"
  },
  {
    title : "7 days",
    value : "next_week"
  },
  {
    title : "1 month",
    value : "next_month"
  },
  ]

  export const currencies =  [
    {
     name : "USDC",
     value :  "USDC",
     key : 0
    },
    {
     name : "USDT",
     value :  "USDT",
     key : 1
    },
    {
      name : "ETH",
      value :  "ETH",
      key : 2
     },
     
 ]

 export const supportedNetworks = [
  {
    name : "Arbitrum",
     value : "arbitrum",
     key : 0
  },
  {
    name : "Base",
     value : "base",
     key : 1
  },
  {
    name : "Polygon",
     value : "polygon",
     key : 2
  },
  {
    name : "TRON",
     value : "tron",
     key : 3
  },
 ]

 export const features = [
  {
    icone : LayoutDashboard,
    title : "Powerful dashboard",
    description : "Easily manage your payments, API keys, and keep your business running smoothly with our intuitive dashboard.",
  },
  {
    icone : Link2,
    title : "Payment links",
    description : "Generate payment links in seconds and receive payments seamlessly—no fuss, no hassle.",
  },
  {
    icone : IconInvoice,
    title : "Create and Send Invoices with Ease",
    description : "Design professional invoices quickly and manage payments effortlessly—streamlined for your convenience",
  },

  {
    icone : Flame,
    title : "Instant settlement",
    description : "munaPay never holds your funds. They are transferred to your Hedera wallet instantly..",
  },
  {
    icone : Code2,
    title : "Easy and powerful SDKs",
    description : "Quickly integrate with your business in a few lines of code and get your pre-built and hosted checkout page",
  },
  {
    icone : TrendingUp,
    title : "Optimised for conversion",
    description : "Create frictionless checkout experiences with one click payments and QR codes.",
  },
]


 export const testStatus =  {
  amount: 3,
invoiceId :"66dfec35f727f9e36b2f01e6",
sender: "0x3495bf0e66f2ec6544be2aadf9326bb2dc3e11e33162843b87c705293b783ad8",
status: "COMPLETED", 
txHash: "0xf201e41e6061782c15ec74dc273ffe86a0cc0c077a379cc5662bb75110b58914"
}

export const variable = [
  {
  name : "project id",
  value : process.env.NEXT_PUBLIC_PROJECT_ID as string
},
{
  name : "client key",
  value : process.env.NEXT_PUBLIC_CLIENT_KEY as string
},
{
  name : "app id",
  value : process.env.NEXT_PUBLIC_APP_ID as string
},
{
  name : "project id",
  value : process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID 
},

]
export const MUNA_PAY_INTRO_TEXT = `ZapPay is a payment solution for individuals and organisations to start accepting payments on Hedera. With a low-code solution, mobile-native design, and support for various payment methods, we make it easy for merchants to upgrade their payment system with crypto.`
