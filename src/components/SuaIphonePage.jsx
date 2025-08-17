import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import FooterComponent from './FooterComponent';
import { Smartphone, CheckCircle, Clock, Shield, Wrench } from 'lucide-react';

const SuaIphonePage = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: <Smartphone className="w-8 h-8 text-orange-500" />,
      title: 'Thay Màn Hình iPhone',
      description: 'Thay màn hình chính hãng, chất lượng cao, bảo hành 12 tháng',
      price: 'Từ 500.000đ'
    },
    {
      icon: <Wrench className="w-8 h-8 text-orange-500" />,
      title: 'Thay Pin iPhone',
      description: 'Pin chính hãng, tuổi thọ cao, bảo hành 6 tháng',
      price: 'Từ 300.000đ'
    },
    {
      icon: <Shield className="w-8 h-8 text-orange-500" />,
      title: 'Thay Camera iPhone',
      description: 'Camera chất lượng cao, góc chụp rộng, bảo hành 12 tháng',
      price: 'Từ 800.000đ'
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-orange-500" />,
      title: 'Sửa Chữa Phần Cứng',
      description: 'Sửa chữa các vấn đề về mainboard, cổng sạc, loa',
      price: 'Từ 200.000đ'
    },
    {
      icon: <Clock className="w-8 h-8 text-orange-500" />,
      title: 'Khắc Phục Phần Mềm',
      description: 'Cài đặt lại iOS, khôi phục dữ liệu, sửa lỗi hệ thống',
      price: 'Từ 150.000đ'
    }
  ];

  const features = [
    'Đội ngũ kỹ thuật viên giàu kinh nghiệm',
    'Linh kiện chính hãng, chất lượng cao',
    'Bảo hành chính thức 6-12 tháng',
    'Thời gian sửa chữa nhanh chóng',
    'Giá cả cạnh tranh, minh bạch',
    'Dịch vụ tận tâm, chuyên nghiệp'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF6600] to-[#FF8533]">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 pt-16 pb-24" style={{ marginTop: '120px' }}>
        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6">
            <Smartphone className="w-10 h-10 text-orange-500" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">
            Sửa Chữa iPhone
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Dịch vụ sửa chữa iPhone chuyên nghiệp với đội ngũ kỹ thuật viên giàu kinh nghiệm. 
            Chúng tôi cam kết mang đến giải pháp tối ưu cho mọi vấn đề của thiết bị iPhone của bạn.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6 mx-auto">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                {service.title}
              </h3>
              <p className="text-gray-600 text-center mb-4 leading-relaxed">
                {service.description}
              </p>
              <div className="text-center">
                <span className="text-2xl font-bold text-orange-500">
                  {service.price}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Tại Sao Chọn Chúng Tôi?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-4">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                <span className="text-white text-lg">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <button 
            onClick={() => navigate('/')}
            className="bg-white text-orange-500 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:shadow-lg text-lg"
          >
            Quay Lại Trang Chủ
          </button>
        </div>
      </div>

      {/* Footer */}
      <FooterComponent />
    </div>
  );
};

export default SuaIphonePage;
