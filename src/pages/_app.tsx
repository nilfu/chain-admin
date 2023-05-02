import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Layout, Menu } from 'antd';
const { Sider, Content } = Layout;
import Link from 'next/link';
import { SWRConfig } from 'swr';
import { options } from '@/libs/swr';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={options}>
      <Layout className="min-h-screen">
        <Sider theme="light">
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={['create-project']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key="/create-project">
              <Link href="/create-project">创建</Link>
            </Menu.Item>

            <Menu.Item key="/find-project">
              <Link href="/find-project">查询</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Content>
          <Component {...pageProps} />
        </Content>
      </Layout>
    </SWRConfig>
  );
}
