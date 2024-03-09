import { readFileSync } from 'fs'
import { config } from '../config'
import { createTransport } from 'nodemailer'

const companyName = config.COMPANY_NAME
const teamName = config.TEAM_NAME

const otpValidityInMinutes = config.OTP_VALIDITY / 60

const transporter = createTransport({
  host: config.EMAIL_HOST,
  port: config.EMAIL_PORT,
  secure: config.EMAIL_SECURE, // true for 465, false for other ports
  auth: {
    user: config.FROM_EMAIL,
    pass: config.EMAIL_PASS,
  },
})

const fromEmail = config.FROM_EMAIL

const templatePath = './src/templates/simple.html'

export const readHTML = (): string => {
  const template = readFileSync(templatePath, 'utf-8')
  return template
}

export const substituteTemplate = (template: string, otp: string): string => {
  let substitutedTemplate = template

  substitutedTemplate = substitutedTemplate.replace(
    /{{COMPANY_NAME}}/g,
    companyName,
  )

  const message = `This OTP is valid for ${otpValidityInMinutes} minutes`

  substitutedTemplate = substitutedTemplate.replace(/{{MESSAGE}}/g, message)

  substitutedTemplate = substitutedTemplate.replace(/{{OTP}}/g, otp)

  substitutedTemplate = substitutedTemplate.replace(/{{TEAM_NAME}}/g, teamName)

  return substitutedTemplate
}

export const sendEmail = async (email: string, template: string) => {
  try {
    await transporter.sendMail({
      from: {
        name: companyName,
        address: fromEmail,
      },
      to: email,
      subject: `OTP for ${companyName}`,
      html: template,
    })
  } catch (error) {
    throw error
  }
}
