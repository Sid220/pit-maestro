import { addYears } from 'date-fns'
import { NextRequest, NextResponse } from 'next/server'

function middleware(req: NextRequest) {
    if (req.nextUrl.pathname.startsWith('/api/get-list')) {
        return NextResponse.next()
    }

    // @ts-ignore
    if (req.cookies['let-me-in'] === process.env.BASIC_AUTH_PASSWORD) {
        return NextResponse.next()
    }

    const basicAuth = req.headers.get('authorization')

    if (basicAuth) {
        const auth = basicAuth.split(' ')[1]
        const [user, pwd] = Buffer.from(auth, 'base64').toString().split(':')

        if (user === process.env.BASIC_AUTH_USER && pwd === process.env.BASIC_AUTH_PASSWORD) {
            const response = NextResponse.next()
            const expire = addYears(new Date(), 1).toUTCString()
            response.headers.set(
                'Set-Cookie',
                `let-me-in=${process.env.BASIC_AUTH_PASSWORD}; Domain=.example.com; Secure; HttpOnly; Expires='${expire}'`,
            )
            return response
        }
    }

    return new Response('Auth required', {
        status: 401,
        headers: {
            'WWW-Authenticate': 'Basic realm="Secure Area"',
        },
    })
}

export default middleware