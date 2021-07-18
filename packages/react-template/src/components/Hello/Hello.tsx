import React from 'react'
import styles from './hello.module.styl'

interface Props {
  content?: string
}

const Hello = ({ content }: Props) => {
  return <div className={styles.hello}>{content}</div>
}

export default Hello
