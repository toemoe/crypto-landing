import { Layout, Select, Space, Button, Modal, Drawer } from 'antd'
import { useCrypto } from '../../context/crypto-context';
import { useEffect, useState } from 'react';
import InfoModal from '../InfoModal';
import AddAssetForm from '../AddAsset';

const headerStyle = {
    width: '100%',
    textAlign: 'center',
    height: 60,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

export default function AppHeader() {
    const [select, setSelect] = useState(false)
    const [modal, setModal] = useState(false)
    const [coin, setCoin] = useState(null)
    const [drawer, setDrawer] = useState(true)
    const { crypto } = useCrypto()

    useEffect(() => {
        const keypress = event => {
            if (event.key === '/') {
                setSelect((prev) => !prev)
            }
        }
        document.addEventListener('keypress', keypress)
        return () => document.removeEventListener('keypress', keypress)
    }, [])

    function handleSelect(value) {
        setCoin(crypto.find((c) => c.id === value))
        setModal(true)
    }

    return (
        <Layout.Header style={headerStyle}>
            <Select
                style={{ width: 250 }}
                open={select}
                onSelect={handleSelect}
                placeholder="Select an Asset"
                onClick={() => setSelect((prev) => !prev)}
                options={crypto.map((coin) => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon,
                }))}
                optionRender={(option) => (
                <Space>
                    <img style={{width: 25}} src={option.data.icon} alt={option.data.label}/> {option.data.label}
                </Space>
                )}
            />

            <Modal closable={{ 'aria-label': 'Custom Close Button' }}
                open={modal} onCancel={() => setModal(false)} footer={null}
            >
            <InfoModal coin={coin}/>    
            </Modal>

            <Button type="primary" onClick={() => setDrawer(true)}>Add Asset</Button>

            <Drawer
                title="Add Asset"
                width={500}
                closable={{ 'aria-label': 'Close Button' }}
                onClose={() => setDrawer(false)}
                open={drawer}
            >
               <AddAssetForm />
            </Drawer>
        </Layout.Header>
    )
}