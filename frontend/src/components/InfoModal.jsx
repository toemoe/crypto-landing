import { Divider, Flex, Tag, Typography } from 'antd';
import { CoinInfo } from './CoinInfo';

export default function InfoModal({ coin }) {
    return (
        <>
        <CoinInfo coin={coin} withSymbol />
        <Divider />
        <Typography.Paragraph style={{ display: 'flex', gap: '10px' }}>
            <Typography.Text strong>1 hour:</Typography.Text>
            <Tag color={coin.priceChange1h > 0 ? 'green' : 'red'}>{coin.priceChange1h}%</Tag>
        </Typography.Paragraph>

        <Typography.Paragraph style={{ display: 'flex', gap: '10px' }}>
            <Typography.Text strong>1 day:</Typography.Text>
            <Tag color={coin.priceChange1d > 0 ? 'green' : 'red'}>{coin.priceChange1d}%</Tag>
        </Typography.Paragraph>

        <Typography.Paragraph style={{ display: 'flex', gap: '10px' }}>
            <Typography.Text strong>1 week:</Typography.Text>
            <Tag color={coin.priceChange1w > 0 ? 'green' : 'red'}>{coin.priceChange1w}%</Tag>
        </Typography.Paragraph>

        <Typography.Paragraph style={{ display: 'flex', gap: '10px' }}>
            <Typography.Text strong>Price:</Typography.Text>
            {coin.price.toFixed(2)}$
        </Typography.Paragraph>

        <Typography.Paragraph style={{ display: 'flex', gap: '10px' }}>
            <Typography.Text strong>Price BTC:</Typography.Text>
            {coin.priceBtc.toFixed(2)}$
        </Typography.Paragraph>

        <Typography.Paragraph style={{ display: 'flex', gap: '10px' }}>
            <Typography.Text strong>Market Cap:</Typography.Text>
            {coin.marketCap.toFixed(2)}$
        </Typography.Paragraph>
        {coin.contractAddress && (
        <Typography.Paragraph style={{ display: 'flex', gap: '10px' }}>
            <Typography.Text strong>Contract Address:</Typography.Text>
            {coin.contractAddress}
        </Typography.Paragraph>
        )}
        </>
    )
}