import { Layout } from 'antd';
import React, { FC, memo, useMemo } from 'react'

const { Footer } = Layout;

const FooterWrapper: FC = () => {
  return useMemo(() => (
    <Footer style={{textAlign: 'center'}}>
      vite react admin template
    </Footer>
  ), [])
}

export default memo(FooterWrapper)