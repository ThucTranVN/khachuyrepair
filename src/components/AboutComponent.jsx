import React from 'react';
import homeAboutUsImg from '../assets/logo/home-about-us.webp';
import home3StepsImg from '../assets/logo/home-3-steps.webp';

const AboutComponent = () => {
  const statistics = [
    {
      number: "5+",
      title: "Năm Kinh Nghiệm",
      description: "Chúng tôi mang đến sự chuyên môn vượt trội trong từng dịch vụ sửa chữa, đảm bảo chất lượng cao và sự hài lòng của bạn."
    },
    {
      number: "30+",
      title: "Thiết Bị Được Sửa Mỗi Ngày",
      description: "Với sự tỉ mỉ và tận tâm, chúng tôi ưu tiên giúp thiết bị của bạn trở lại hoạt động nhanh nhất có thể."
    },
    {
      number: "5+",
      title: "Chuyên Gia Kỹ Thuật",
      description: "Đội ngũ kỹ thuật viên giàu kinh nghiệm mang đến dịch vụ vượt trội và chuyên môn cao trong từng ca sửa chữa."
    },
    {
      number: "2.5k+",
      title: "Khách Hàng Tại TP.HCM",
      description: "Sự tin tưởng của khách hàng là minh chứng cho cam kết mang đến dịch vụ sửa chữa di động chất lượng và đáng tin cậy."
    }
  ];

  const repairSteps = [
    {
      icon: "📅",
      step: "1",
      description: "Liên hệ Khắc Huy Repair qua điện thoại, email hoặc website để đặt lịch hẹn tại một trong các chi nhánh."
    },
    {
      icon: "🔧",
      step: "2",
      description: "Đến trung tâm sửa chữa thuận tiện tại TP.HCM và mang theo điện thoại của bạn để được kiểm tra, chẩn đoán."
    },
    {
      icon: "📱",
      step: "3",
      description: "Sau khi sửa xong, chúng tôi sẽ thông báo ngay. Bạn chỉ cần đến trung tâm để nhận lại thiết bị đã được sửa chữa."
    }
  ];

  return (
    <section className="about" id="about">
      <div className="container">
        {/* Original About Content */}
        <div className="about-content">
          {/* Left Section - Image */}
          <div className="about-left">
            <div className="about-image-container">
              <img 
                src={homeAboutUsImg} 
                alt="About Khắc Huy Repair" 
                className="about-image"
              />
            </div>
          </div>
          
          {/* Right Section - Text Content */}
          <div className="about-right">
            <div className="about-subtitle">VỀ CHÚNG TÔI</div>
            <h2 className="about-title">
              Mang lại sức sống cho <span className="highlight">thiết bị của bạn.</span>
            </h2>
            <div className="about-description">
              <p>Hãy đặt lịch sửa chữa cùng Khắc Huy Repair ngay hôm nay để trải nghiệm sự tiện lợi và chuyên nghiệp tối đa.</p> 
              <p>Tại Khắc Huy Repair, chúng tôi cam kết là điểm đến đáng tin cậy cho mọi nhu cầu sửa chữa thiết bị di động tại TP. Hồ Chí Minh. Với nhiều năm kinh nghiệm, đội ngũ kỹ thuật viên tay nghề cao luôn sẵn sàng chẩn đoán và khắc phục đa dạng các sự cố trên thiết bị của bạn.</p> 
              <p>Chúng tôi hiểu rõ sự khó chịu khi thiết bị gặp trục trặc, vì vậy Khắc Huy Repair luôn nỗ lực mang đến giải pháp nhanh chóng và bền vững, giúp bạn sớm trở lại tận hưởng thiết bị của mình mà không bị gián đoạn.</p>
            </div>
            {/* <button className="about-cta-button">
              Learn More
              <span className="arrow">→</span>
            </button> */}
          </div>
        </div>

        {/* Statistics Section */}
        <div className="statistics-section">
          <div className="statistics-grid">
            {statistics.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <h3 className="stat-title">{stat.title}</h3>
                <p className="stat-description">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How We Work Section */}
        <div className="how-we-work-section">
          <div className="how-we-work-content">
            {/* Left Section - Text Content */}
            <div className="how-we-work-left">
              <div className="how-we-work-subtitle">CÁCH CHÚNG TÔI LÀM VIỆC</div>
              <h2 className="how-we-work-title">
                Sửa chữa chỉ với <span className="highlight">3 bước.</span>
              </h2>
              <div className="how-we-work-subtitle-text">
                An tâm sửa chữa cùng chuyên gia.
              </div>
              <div className="repair-steps">
                {repairSteps.map((step, index) => (
                  <div key={index} className="repair-step">
                    <div className="step-icon">{step.icon}</div>
                    <div className="step-content">
                      <div className="step-number">{step.step}</div>
                      <p className="step-description">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Section - Image */}
            <div className="how-we-work-right">
              <div className="how-we-work-image-container">
                <img 
                  src={home3StepsImg} 
                  alt="3 Steps to Repair Process" 
                  className="how-we-work-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutComponent;
