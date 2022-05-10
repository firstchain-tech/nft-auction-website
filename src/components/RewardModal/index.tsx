import { memo } from 'react'
import type { RewardListType } from '@/common/data.d'
import { useForm } from 'antd/lib/form/Form'
import { Image, Form, Input, Button } from 'antd'
import { RewardModalWrapper, RewardModalContent, RewardTile, RewardInfo, SpanTitle } from './styled'
// import useDataHooks from '@/hooks/useDataHooks'
// import type { ConstantInitTypes } from '@/contracts/constantInit'
import { useTranslation } from 'react-i18next'
import { useWindowSizeHooks } from '@/hooks/useWindowSizeHooks'
import { Adapth5 } from '@/utils'

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

  // const dataInit: ConstantInitTypes = useDataHooks()
  // const { toWeiFromWei } = dataInit

  const layout = {
    labelCol: { span: 8, sm: { span: 6 } },
    wrapperCol: { span: 16, sm: { span: 18 } },
  }

  const onFinish = (values: any) => {}

  return (
    <RewardModalWrapper>
      <RewardModalContent>
        <Image src={details.iamge} preview={false} className="Reward-image"></Image>
        <div style={{ height: windowSize.innerWidth >= Adapth5 ? '27.5rem' : '13.31rem' }}></div>
        <h5>{t('home.reward.h5')}</h5>
        <RewardTile>{details.name}</RewardTile>
        <RewardInfo>{t('home.reward.info')}</RewardInfo>

        <Form
          layout="horizontal"
          style={{ display: isAuction ? 'block' : 'none' }}
          {...layout}
          form={form}
          name={'reward#' + index}
          onFinish={onFinish}
        >
          <div className="form-address form-address-h5" style={{ marginBottom: '2.13rem' }}>
            <Form.Item
              name="address"
              label={<SpanTitle>{t('home.reward.form1.label')}</SpanTitle>}
              rules={[{ required: true, message: t('home.reward.form1.rules') }]}
            >
              <Input placeholder={t('home.reward.form1.placeholder')} className="form-address" style={{ padding: '0 10.06rem 0 2.5rem' }} />
            </Form.Item>
            <Button type="primary">{t('home.reward.form1.btn')}</Button>
          </div>
          <Form.Item
            name="email"
            label={<SpanTitle>{t('home.reward.form2.label')}</SpanTitle>}
            rules={[{ required: true, message: t('home.reward.form2.rules') }]}
          >
            <Input placeholder={t('home.reward.form1.placeholder')} style={{ padding: '0 2.5rem' }} className="form-email" />
          </Form.Item>
          <div className="reward-form-btn">
            <Button type="primary" htmlType="submit" className="reward-btn">
              {t('home.reward.btn1')}
            </Button>
          </div>
        </Form>
        <Button type="primary" className="reward-btn" style={{ display: !isAuction ? 'block' : 'none' }}>
          {t('home.reward.btn2')}
        </Button>
      </RewardModalContent>
    </RewardModalWrapper>
  )
})
