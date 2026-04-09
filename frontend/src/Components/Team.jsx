import React from 'react'
import mukeshImg from '../../src/assets/team_mukesh.png'
import rajImg from '../../src/assets/team_raj.png'
import saurbhImg from '../../src/assets/team_saurbh.png'

const team = [
  {
    name: "Mukesh Kumar",
    role: "Proprietor",
    img: mukeshImg
  },
  {
    name: "Raj",
    role: "Technical Head",
    img: rajImg
  },
  {
    name: "Saurbh Sharma",
    role: "Service Coordinator",
    img: saurbhImg
  }
]


const Team = () => {
  return (
    <section id="team" className="section-padding bg-white">
      <div className="text-center mb-16">
        <h4 className="text-secondary font-semibold mb-2">OUR TEAM</h4>
        <h2 className="text-3xl md:text-4xl text-primary mb-4">Meet Our Dedicated Team Members</h2>
        <div className="w-20 h-1 bg-secondary mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {team.map((member, idx) => (
          <div key={idx} className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500">
            <img 
              src={member.img} 
              alt={member.name} 
              className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white text-center">
              <h3 className="text-xl font-bold mb-1">{member.name}</h3>
              <p className="text-secondary font-medium text-sm transition-opacity group-hover:opacity-100">{member.role}</p>
            </div>
            
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white/20 backdrop-blur-md p-2 rounded-xl text-white">
                {/* Social icons could go here */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Team
