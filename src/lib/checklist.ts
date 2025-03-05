export enum CheckTypes {
    HEADER_1 = "header1",
    HEADER_2 = "header2",
    BOOL = "bool",
    STRING = "string"
}

export class Check {
    mode: CheckTypes;
    value: string;
    state: string | boolean;

    constructor(mode: CheckTypes, value: string, state?: boolean | string) {
        this.mode = mode;
        this.value = value;
        if (typeof state !== "undefined") {
            this.state = state;
        } else {
            this.state = mode == CheckTypes.BOOL ? false : "";
        }
    }

    toJSON() {
        return {
            type: this.mode.toString(),
            value: this.value,
            state: this.state
        }
    }
}

export const checklist = [
    new Check(CheckTypes.HEADER_1, 'Kinetic Tests'),

    new Check(CheckTypes.BOOL, 'Driving'),
    new Check(CheckTypes.BOOL, 'L1-L4 setpoints correct'),
    new Check(CheckTypes.BOOL, 'Intake and score coral'),
    new Check(CheckTypes.BOOL, 'Intake algae high and low'),
    new Check(CheckTypes.BOOL, 'Score algae processor and net'),
    new Check(CheckTypes.BOOL, 'Climber deploy and retract'),

    new Check(CheckTypes.HEADER_1, 'Static Tests'),

    new Check(CheckTypes.HEADER_2, 'Chassis'),

    new Check(CheckTypes.BOOL, 'Bumpers set to correct colour'),
    new Check(CheckTypes.BOOL, 'Bumpers tightly secure'),
    new Check(CheckTypes.BOOL, 'Kraken motors secure'),
    new Check(CheckTypes.BOOL, 'Swerve mounting bolts secure'),
    new Check(CheckTypes.BOOL, 'Check tread wear'),
    new Check(CheckTypes.BOOL, 'Check wheel wobble'),

    new Check(CheckTypes.HEADER_2, 'Elevator And Pivot'),

    new Check(CheckTypes.BOOL, 'Check bolts'),
    new Check(CheckTypes.BOOL, 'Bearing blocks secure'),
    new Check(CheckTypes.BOOL, 'Dyneema intact'),
    new Check(CheckTypes.BOOL, 'Dyneema tight'),
    new Check(CheckTypes.BOOL, 'Dyneema correctly wrapped around pulleys'),
    new Check(CheckTypes.BOOL, 'Rivets not sheared'),
    new Check(CheckTypes.BOOL, 'Chain tight'),
    new Check(CheckTypes.BOOL, 'Motors secure'),
    new Check(CheckTypes.BOOL, 'Chains tight and tensioners intact'),

    new Check(CheckTypes.HEADER_2, 'Ballzooka'),
    new Check(CheckTypes.BOOL, 'Belts tight'),
    new Check(CheckTypes.BOOL, 'Pulleys intact'),
    new Check(CheckTypes.BOOL, 'Rollers and wheels IPA-ed'),
    new Check(CheckTypes.BOOL, 'Chain tight'),
    new Check(CheckTypes.BOOL, 'Wiggle test all parts'),
    new Check(CheckTypes.BOOL, 'Bolts secure'),
    new Check(CheckTypes.BOOL, 'Max Spline shaft collars tight'),
    new Check(CheckTypes.BOOL, 'Sensor screws tight'),

    new Check(CheckTypes.HEADER_2, 'Climber'),
    new Check(CheckTypes.BOOL, 'Motors secure'),
    new Check(CheckTypes.BOOL, 'Chain tight'),
    new Check(CheckTypes.BOOL, 'Hooks intact'),
    new Check(CheckTypes.BOOL, 'Surgical tubing on'),

    new Check(CheckTypes.HEADER_2, 'Electrical'),
    new Check(CheckTypes.BOOL, 'Radio mount secure'),
    new Check(CheckTypes.BOOL, 'Check all screws+pull test CAN hub'),
    new Check(CheckTypes.BOOL, 'Wires clear of swerve modules, elevator, shooter, and intake'),
    new Check(CheckTypes.BOOL, 'Radio ethernet lights on'),
    new Check(CheckTypes.BOOL, 'Main Breaker secure'),
    new Check(CheckTypes.BOOL, 'New battery above 115% charge'),
    new Check(CheckTypes.BOOL, 'New battery placed into robot'),
    new Check(CheckTypes.BOOL, 'Battery secure and zip-tied'),
    new Check(CheckTypes.BOOL, 'Pigeon LEDs on (🟠🟠 -> ⚫⚫)'),
    new Check(CheckTypes.BOOL, 'Kraken LEDs on (🟠🟠 -> ⚫⚫)'),
    new Check(CheckTypes.BOOL, 'Spark LEDs on (🩵->⚫ or 🩷->⚫)'),
    new Check(CheckTypes.BOOL, 'Jetson working'),
    new Check(CheckTypes.BOOL, 'Cameras working'),

    new Check(CheckTypes.HEADER_2, 'Documentation'),
    new Check(CheckTypes.BOOL, 'Document Spares used'),
    new Check(CheckTypes.BOOL, 'Document damaged parts still on robot'),
    new Check(CheckTypes.BOOL, 'Any notes on the robot\'s condition or performance on separate sheet'),

    new Check(CheckTypes.STRING, "Battery Number"),
    new Check(CheckTypes.STRING, "Battery Charge (%)"),
    new Check(CheckTypes.STRING, "Battery Resistance"),
    new Check(CheckTypes.STRING, 'Notes')
]

export function toJSONString(checks: Check[]) {
    let JSONstring: {
        type: string,
        value: string,
        state: string | boolean

    }[] = []
    checks.forEach((check) => {
        JSONstring.push(check.toJSON())
    })
    return JSON.stringify(JSONstring);
}

export function fromJSONString(checks: string) {
    let data = (JSON.parse(checks) as {
        type: string,
        value: string,
        state: string | boolean
    }[]);

    let parsedChecks: Check[] = [];
    data.forEach(((c) => {
        let checkType = CheckTypes.HEADER_1
        switch (c.type) {
            case "bool":
                checkType = CheckTypes.BOOL
                break;
            case "header1":
                checkType = CheckTypes.HEADER_1
                break;
            case "header2":
                checkType = CheckTypes.HEADER_2
                break;
            case "string":
                checkType = CheckTypes.STRING
                break;
        }
        parsedChecks.push(new Check(checkType, c.value, c.state));
    }));

    return parsedChecks;
}