import { memo, useState } from 'react'
import type { RewardListType } from '@/common/data.d'
import { useForm } from 'antd/lib/form/Form'
import { Image, Form, Input, Button, message, Spin } from 'antd'
import { RewardModalWrapper, RewardModalContent, RewardTile, RewardInfo, SpanTitle } from './styled'
// import useDataHooks from '@/hooks/useDataHooks'
// import type { ConstantInitTypes } from '@/contracts/constantInit'
import { useTranslation } from 'react-i18next'
import { useWindowSizeHooks } from '@/hooks/useWindowSizeHooks'
import { Adapth5 } from '@/utils'
import { Link } from 'react-router-dom'
import { ResponseCode } from '@/contracts/init'
import { useSelector } from 'react-redux'
import { getArticipationAwardRequest } from '@/api'

interface Type {
  details: RewardListType
  index: number
  isAuction: boolean
}

export default memo(function RewardModalPage(params: Type) {
  const { details, index, isAuction } = params
  const [form] = useForm()
  const { windowSize } = useWindowSizeHooks()

  const { t } = useTranslation()
  const myAddress = useSelector((state: any) => state.userInfo.address)
  const [loading, setLoading] = useState<boolean>(false)

  // const dataInit: ConstantInitTypes = useDataHooks()
  // const { toWeiFromWei } = dataInit

  const layout = {
    labelCol: { span: 8, sm: { span: 5 } },
    wrapperCol: { span: 16, sm: { span: 19 } },
  }

  const onFinish = async (values: any) => {
    setLoading(true)
    try {
      let params = {
        ...values,
        address: myAddress,
      }
      console.log('params', params)
      const response: any = await getArticipationAwardRequest(params)
      console.log('response', response)
      if (response) {
        let text = ResponseCode[response.code]
        if (response.code === 0) {
          message.success({
            content: text,
            className: 'message-global',
          })
          form.resetFields()
          setTimeout(() => {
            setLoading(false)
          }, 1000)
          return
        }
        message.error({
          content: text,
          className: 'message-global',
        })
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      }
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    } catch (error) {
      setLoading(false)
      console.log('error', error)
    }
  }

  return (
    <RewardModalWrapper>
      <RewardModalContent>
        <Image src={details.iamge} preview={false} className="Reward-image"></Image>
        <div style={{ height: windowSize.innerWidth >= Adapth5 ? '26.5rem' : '13.31rem' }}></div>
        <h5>{t('home.reward.h5')}</h5>
        <RewardTile>{details.name}</RewardTile>
        <RewardInfo>{t('home.reward.info')}</RewardInfo>
        <>
          {myAddress && (
            <Form
              layout="horizontal"
              style={{ display: isAuction ? 'block' : 'none' }}
              {...layout}
              form={form}
              name={'reward#' + index}
              onFinish={onFinish}
            >
              <Spin tip="Loading..." spinning={loading}>
                {/* <div className="form-address form-address-h5" style={{ marginBottom: '2.13rem' }}>
                  <Form.Item
                    name="did"
                    label={<SpanTitle>{t('home.reward.form1.label')}</SpanTitle>}
                    rules={[{ required: true, message: t('home.reward.form1.rules') }]}
                  >
                    <Input
                      placeholder={t('home.reward.form1.placeholder')}
                      className="form-address"
                      style={{ padding: '0 10.06rem 0 2.5rem' }}
                    />
                  </Form.Item>
                  <Button type="primary">{t('home.reward.form1.btn')}</Button>
                </div> */}
                <Form.Item
                  name="email"
                  label={<SpanTitle>{t('home.reward.form2.label')}</SpanTitle>}
                  rules={[
                    {
                      type: 'email',
                      message: t('home.reward.form2.rules2'),
                    },
                    { required: true, message: t('home.reward.form2.rules') },
                  ]}
                >
                  <Input placeholder={t('home.reward.form2.placeholder')} style={{ padding: '0 2.5rem' }} className="form-email" />
                </Form.Item>
                <div className="reward-form-btn">
                  <Button type="primary" htmlType="submit" className="reward-btn">
                    {t('home.reward.btn1')}
                  </Button>
                </div>
              </Spin>
            </Form>
          )}
        </>
        <Link to="/home#auction">
          <Button type="primary" className="reward-btn" style={{ display: !isAuction ? 'block' : 'none' }}>
            {t('home.reward.btn2')}
          </Button>
        </Link>
      </RewardModalContent>
    </RewardModalWrapper>
  )
})
