import React, { ReactNode } from 'react'
import './compTip.scss'
type CompTipProps = {
  tip: string;
  children?: ReactNode;
};

export const CompTip: React.FC<CompTipProps>= ({ tip, children }) => {
    return <div className="compTip">
      {children}
      <p className="msg">{tip}</p>
    </div>
}