import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Table from 'antd/es/table';
import Space from 'antd/es/space';
import Button from 'antd/es/button';
import Card from 'antd/es/card';
import Empty from 'antd/es/empty';
import Spin from 'antd/es/spin';
import Input from 'antd/es/input';
import 'antd/es/input/style';
const { Search } = Input;
import Typography from 'antd/es/typography';
import 'antd/es/typography/style';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
import { Select } from 'antd';
const { Option } = Select;
import type { TablePaginationConfig } from 'antd/es/table';
import MainLayout from '../../components/Layout/MainLayout';
import { getManagers, type Manager, getAllCompany } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const { Title, Text } = Typography;

const Managers = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [managers, setManagers] = useState<Manager[]>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchText, setSearchText] = useState<string>('');
  const [companies, setCompanies] = useState<Array<{ id: number; name: string }>>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await getAllCompany();
        setCompanies(response.data || []);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();
  }, []);

  const fetchManagers = async (page = 1, search = '', companyId?: number) => {
    try {
      setLoading(true);
      const orgId = companyId !== undefined ? companyId : (user?.organization_id || 1);
      const response = await getManagers(
        orgId,
        page,
        pagination.pageSize,
        search
      );

      setManagers(response.data);
      setPagination({
        ...pagination,
        current: response.page,
        total: response.total,
      });
      
      setManagers(response.data);
      setPagination({
        ...pagination,
        current: response.page,
        total: response.total,
      });
    } catch (error) {
      console.error('Error fetching managers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = 'Managers | PreventixAI Admin';
    fetchManagers(1, '');
  }, []);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    if (pagination.current) {
      fetchManagers(pagination.current, searchText);
    }
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    fetchManagers(1, value, selectedCompanyId ? Number(selectedCompanyId) : undefined);
  };

  const handleCompanyChange = (value: string | null) => {
    setSelectedCompanyId(value);
    fetchManagers(1, searchText, value ? Number(value) : undefined);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: Manager) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            backgroundColor: '#f0f2f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <UserOutlined />
          </div>
          <div>
            <div style={{ fontWeight: 500 }}>{record.email.split('@')[0]}</div>
            <Text type="secondary" style={{ fontSize: '12px' }}>{record.email}</Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phone_number',
      key: 'phone_number',
      render: (phone: string) => phone || 'N/A',
    },
    {
      title: 'Job Title',
      dataIndex: 'job_title',
      key: 'job_title',
      render: (jobTitle: string) => jobTitle || 'N/A',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Manager) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => navigate(`/managers/edit/${record.id}`)}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => console.log('Delete', record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="form-container">
          <div className="page-header" style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Title level={2} style={{ margin: 0 }}>Managers</Title>
                <Text type="secondary">Manage and view all registered managers</Text>
              </div>
              <Link to="/managers/add">
                <Button type="primary" icon={<PlusOutlined />}>
                  Add Manager
                </Button>
              </Link>
            </div>
          </div>

          <Card>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <Search
                  placeholder="Search managers..."
                  prefix={<SearchOutlined />}
                  style={{ width: 300 }}
                  value={searchText}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
                  onSearch={handleSearch}
                  enterButton
                  allowClear
                />
                <Select
                  placeholder="Filter by company"
                  style={{ width: 300 }}
                  onChange={handleCompanyChange}
                  value={selectedCompanyId}
                  allowClear
                  showSearch
                  optionFilterProp="children"
                >
                  {companies.map(company => (
                    <Option key={company.id} value={company.id.toString()}>
                      {`${company.name} (ID: ${company.id})`}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>

            {loading && managers.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <Spin size="large" />
              </div>
            ) : managers.length === 0 ? (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <span>No managers found. Add your first manager to get started.</span>
                }
              >
                <Link to="/managers/add">
                  <Button type="primary" icon={<PlusOutlined />}>
                    Add Manager
                  </Button>
                </Link>
              </Empty>
            ) : (
              <Table
                columns={columns}
                dataSource={managers}
                rowKey="id"
                pagination={{
                  ...pagination,
                  showSizeChanger: true,
                  pageSizeOptions: ['10', '20', '50', '100'],
                  showTotal: (total: number) => `Total ${total} managers`,
                }}
                loading={loading}
                onChange={handleTableChange}
              />
            )}
          </Card>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default Managers;