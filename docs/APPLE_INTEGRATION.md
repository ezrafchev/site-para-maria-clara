# 🍎 Apple Integration Guide

Este documento fornece instruções detalhadas para implementar Apple Pay e Sign in with Apple no site da Maria Clara.

## 🔐 Sign in with Apple

### Pré-requisitos
1. **Apple Developer Account**: Conta ativa no Apple Developer Program ($99/ano)
2. **App ID**: Configurar no Apple Developer Console
3. **Service ID**: Para autenticação web
4. **Domain Verification**: Verificar propriedade do domínio

### Configuração Passo a Passo

#### 1. Apple Developer Console Setup
```bash
# 1. Acesse: https://developer.apple.com/account/
# 2. Navigate to: Certificates, Identifiers & Profiles
# 3. Create new App ID:
#    - Description: "Maria Clara Love Site"
#    - Bundle ID: "com.ezrafchev.mariaclara"
#    - Enable: Sign in with Apple
```

#### 2. Service ID Configuration
```json
{
  "identifier": "com.ezrafchev.mariaclara.web",
  "description": "Maria Clara Web Service",
  "domains": ["ezrafchev.github.io"],
  "return_urls": ["https://ezrafchev.github.io/site-para-maria-clara/auth/callback"]
}
```

#### 3. Domain Verification
Criar arquivo: `/.well-known/apple-developer-domain-association.txt`
```
# Content será fornecido pelo Apple Developer Console
# Deve ser colocado na raiz do domínio
```

#### 4. Implementation Code
```javascript
// apple-signin.js
class AppleSignIn {
  constructor() {
    this.clientId = 'com.ezrafchev.mariaclara.web'
    this.redirectURI = 'https://ezrafchev.github.io/site-para-maria-clara/auth/callback'
    this.scope = 'name email'
  }

  async signIn() {
    try {
      const response = await AppleID.auth.signIn({
        clientId: this.clientId,
        redirectURI: this.redirectURI,
        scope: this.scope,
        responseType: 'code id_token',
        responseMode: 'form_post'
      })
      
      return this.handleAuthResponse(response)
    } catch (error) {
      console.error('Apple Sign In Error:', error)
      throw error
    }
  }

  handleAuthResponse(response) {
    // Process the authentication response
    const { authorization, user } = response
    
    // Store user information securely
    if (user) {
      localStorage.setItem('user', JSON.stringify({
        name: user.name,
        email: user.email,
        appleId: authorization.code
      }))
    }
    
    return response
  }
}

// Usage
const appleAuth = new AppleSignIn()
document.getElementById('apple-signin-btn').addEventListener('click', () => {
  appleAuth.signIn()
})
```

#### 5. HTML Integration
```html
<!-- Apple Sign In Button -->
<div id="apple-signin-btn" class="apple-signin-btn">
  <img src="/apple-signin-logo.svg" alt="Sign in with Apple" />
  <span>Entrar com Apple</span>
</div>

<!-- Apple JS SDK -->
<script src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/pt_BR/appleid.auth.js"></script>
```

### Segurança e Validação
- JWT token validation no backend
- Verificação de signature usando Apple public keys
- Rate limiting para tentativas de login
- CSRF protection

## 💳 Apple Pay Integration

### Pré-requisitos
1. **Merchant ID**: Registrado no Apple Developer
2. **Payment Processing**: Gateway de pagamento compatível
3. **SSL Certificate**: Domain validation certificate
4. **iOS Device**: Para testes (ou simulador)

### Configuração Merchant

#### 1. Merchant ID Setup
```bash
# Apple Developer Console:
# 1. Identifiers → Merchant IDs
# 2. Create new Merchant ID:
#    - Description: "Maria Clara Donations"
#    - Identifier: "merchant.com.ezrafchev.mariaclara"
```

#### 2. Domain Verification
```bash
# Download domain association file from Apple
# Place at: https://ezrafchev.github.io/.well-known/apple_pay_domain_association
# File contains Apple's verification signature
```

#### 3. Implementation Code
```javascript
// apple-pay.js
class ApplePayment {
  constructor() {
    this.merchantId = 'merchant.com.ezrafchev.mariaclara'
    this.supportedNetworks = ['visa', 'masterCard', 'amex']
    this.merchantCapabilities = ['supports3DS']
    this.countryCode = 'BR'
    this.currencyCode = 'BRL'
  }

  async checkAvailability() {
    if (!window.ApplePaySession) {
      throw new Error('Apple Pay not supported')
    }
    
    const canMakePayments = ApplePaySession.canMakePayments()
    const canMakePaymentsWithActiveCard = await ApplePaySession.canMakePaymentsWithActiveCard(this.merchantId)
    
    return canMakePayments && canMakePaymentsWithActiveCard
  }

  async createSession(amount, label = 'Doação para Maria Clara') {
    const paymentRequest = {
      countryCode: this.countryCode,
      currencyCode: this.currencyCode,
      supportedNetworks: this.supportedNetworks,
      merchantCapabilities: this.merchantCapabilities,
      total: {
        label: label,
        amount: amount.toString(),
        type: 'final'
      }
    }

    const session = new ApplePaySession(3, paymentRequest)
    
    session.onvalidatemerchant = this.onValidateMerchant.bind(this)
    session.onpaymentauthorized = this.onPaymentAuthorized.bind(this)
    session.oncancel = this.onCancel.bind(this)
    
    return session
  }

  async onValidateMerchant(event) {
    try {
      // This would typically be done on your backend
      const validationResponse = await fetch('/api/apple-pay/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          validationURL: event.validationURL,
          merchantId: this.merchantId
        })
      })
      
      const session = event.target
      session.completeMerchantValidation(await validationResponse.json())
    } catch (error) {
      console.error('Merchant validation failed:', error)
      event.target.abort()
    }
  }

  async onPaymentAuthorized(event) {
    try {
      const payment = event.payment
      
      // Process payment with your payment processor
      const result = await this.processPayment(payment)
      
      if (result.success) {
        event.target.completePayment(ApplePaySession.STATUS_SUCCESS)
        this.onPaymentSuccess(result)
      } else {
        event.target.completePayment(ApplePaySession.STATUS_FAILURE)
        this.onPaymentError(result.error)
      }
    } catch (error) {
      console.error('Payment processing failed:', error)
      event.target.completePayment(ApplePaySession.STATUS_FAILURE)
    }
  }

  async processPayment(payment) {
    // This would integrate with your payment processor
    // Example: Stripe, Square, etc.
    const response = await fetch('/api/process-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        paymentData: payment.token,
        billingContact: payment.billingContact,
        shippingContact: payment.shippingContact
      })
    })
    
    return response.json()
  }

  onCancel() {
    console.log('Apple Pay cancelled')
  }

  onPaymentSuccess(result) {
    console.log('Payment successful:', result)
    // Show success message to user
  }

  onPaymentError(error) {
    console.error('Payment failed:', error)
    // Show error message to user
  }
}

// Usage
const applePay = new ApplePayment()

document.getElementById('apple-pay-btn').addEventListener('click', async () => {
  try {
    const isAvailable = await applePay.checkAvailability()
    
    if (isAvailable) {
      const session = await applePay.createSession(10.00, 'Doação Romântica')
      session.begin()
    } else {
      alert('Apple Pay não está disponível neste dispositivo')
    }
  } catch (error) {
    console.error('Apple Pay error:', error)
  }
})
```

#### 4. HTML Integration
```html
<!-- Apple Pay Button -->
<div id="apple-pay-btn" class="apple-pay-btn" style="display: none;">
  <apple-pay-button 
    buttonstyle="black" 
    type="donate" 
    locale="pt-BR">
  </apple-pay-button>
</div>

<!-- Fallback for non-Apple Pay devices -->
<div id="fallback-payment" class="payment-fallback">
  <button class="standard-payment-btn">
    💳 Fazer Doação
  </button>
</div>
```

### CSS Styling
```css
/* Apple Pay Button Styling */
.apple-pay-btn {
  margin: 1rem 0;
}

apple-pay-button {
  --apple-pay-button-width: 200px;
  --apple-pay-button-height: 50px;
  --apple-pay-button-border-radius: 8px;
  --apple-pay-button-padding: 0;
  --apple-pay-button-box-sizing: border-box;
}

.payment-fallback {
  margin: 1rem 0;
}

.standard-payment-btn {
  background: linear-gradient(135deg, #007aff, #5856d6);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.standard-payment-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
}
```

## 🧪 Testing

### Development Testing
```javascript
// Mock Apple Pay for development
if (process.env.NODE_ENV === 'development') {
  window.ApplePaySession = class MockApplePaySession {
    static canMakePayments() { return true }
    static canMakePaymentsWithActiveCard() { return Promise.resolve(true) }
    
    constructor(version, paymentRequest) {
      this.paymentRequest = paymentRequest
      setTimeout(() => this.mockValidation(), 1000)
    }
    
    begin() { console.log('Mock Apple Pay session started') }
    abort() { console.log('Mock Apple Pay session aborted') }
    
    mockValidation() {
      this.onvalidatemerchant({
        validationURL: 'https://mock.apple.com/validate',
        target: this
      })
    }
    
    completeMerchantValidation(response) {
      console.log('Mock merchant validation completed')
      setTimeout(() => this.mockPayment(), 2000)
    }
    
    mockPayment() {
      this.onpaymentauthorized({
        payment: {
          token: { paymentData: 'mock_token' },
          billingContact: { locality: 'São Paulo' }
        },
        target: this
      })
    }
    
    completePayment(status) {
      console.log('Mock payment completed with status:', status)
    }
  }
}
```

## 📋 Checklist de Implementação

### Sign in with Apple
- [ ] Conta Apple Developer ativa
- [ ] App ID configurado com Sign in with Apple
- [ ] Service ID criado para web
- [ ] Domain verification file colocado
- [ ] JavaScript SDK integrado
- [ ] Backend endpoint para validação JWT
- [ ] UI/UX implementada
- [ ] Testes realizados

### Apple Pay
- [ ] Merchant ID registrado
- [ ] Domain association file colocado
- [ ] Payment processor integrado
- [ ] JavaScript implementation
- [ ] Backend endpoints criados
- [ ] SSL certificado válido
- [ ] Testes em dispositivo real
- [ ] Fallback para dispositivos não-Apple

## 🔧 Troubleshooting

### Problemas Comuns

#### Sign in with Apple
- **Domain verification failed**: Verificar se o arquivo está acessível via HTTPS
- **Invalid client_id**: Verificar Service ID no Apple Developer Console
- **Redirect URI mismatch**: URLs devem ser exatamente iguais

#### Apple Pay
- **Merchant validation failed**: Verificar Merchant ID e domain association
- **Payment authorization failed**: Problemas no payment processor
- **canMakePayments false**: Dispositivo não suporta Apple Pay

### Logs e Debugging
```javascript
// Enable debug mode
const DEBUG = true

if (DEBUG) {
  console.log('Apple Pay Session:', ApplePaySession)
  console.log('Can make payments:', ApplePaySession.canMakePayments())
  
  // Log all Apple Pay events
  session.addEventListener('all', (event) => {
    console.log('Apple Pay Event:', event.type, event)
  })
}
```

## 📞 Suporte

Para implementação completa das integrações Apple:

1. **Documentação Oficial**: 
   - [Apple Pay JS](https://developer.apple.com/documentation/apple_pay_on_the_web)
   - [Sign in with Apple](https://developer.apple.com/sign-in-with-apple/)

2. **Comunidade**: 
   - Stack Overflow tags: `apple-pay`, `sign-in-with-apple`
   - Apple Developer Forums

3. **Consultoria**: 
   - Considere contratar um desenvolvedor especializado em integrações Apple
   - Custo estimado: $2,000 - $5,000 para implementação completa

---

**Nota**: Estas integrações requerem uma conta Apple Developer ativa ($99/ano) e conhecimento avançado de desenvolvimento web e backend.