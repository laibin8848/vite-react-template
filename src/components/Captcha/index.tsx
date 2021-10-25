import React, { useEffect, useState } from "react";
import { common } from "services";

interface ICaptcha {
  captchaReady: Function
}

const Captcha: React.FC<ICaptcha> = ({
  captchaReady
}: ICaptcha) => {
  const [captcha, setCaptcha] = useState('')

  const getCaptcha = () => {
    common.captcha().then(res=> {
      captchaReady(res.data.checkKey)
      setCaptcha(res.data.captchaBase64)
    })
  }

  useEffect(()=> {
    getCaptcha()
  }, [])

  return (
    <img onClick={getCaptcha} style={{height: '30px', width: '100px', marginLeft: '4px', cursor: 'pointer'}} src={captcha} />
  )
}

export default Captcha;
