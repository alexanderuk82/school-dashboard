import { Day, PrismaClient, UserSex } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
	await prisma.result.deleteMany();
	await prisma.attendance.deleteMany();
	await prisma.assignment.deleteMany();
	await prisma.exam.deleteMany();
	await prisma.lesson.deleteMany();
	await prisma.student.deleteMany();
	await prisma.class.deleteMany();
	await prisma.parent.deleteMany();
	await prisma.teacher.deleteMany();
	await prisma.grade.deleteMany();
	await prisma.admin.deleteMany();
	await prisma.subject.deleteMany();

	// ADMIN
	await prisma.admin.create({
		data: {
			id: "admin1",
			username: "admin1"
		}
	});
	await prisma.admin.create({
		data: {
			id: "admin2",
			username: "admin2"
		}
	});

	// GRADE
	for (let i = 1; i <= 6; i++) {
		await prisma.grade.create({
			data: {
				level: i
			}
		});
	}

	const grades = await prisma.grade.findMany();
	console.log("Grados creados:", grades);
	if (grades.length !== 6) {
		throw new Error(
			"Error al crear los grados, no se encontraron todos los registros esperados."
		);
	}

	// TEACHER
	for (let i = 1; i <= 15; i++) {
		await prisma.teacher.create({
			data: {
				id: `teacher${i}`, // Unique ID for the teacher
				username: `teacher${i}`,
				name: `TName${i}`,
				surname: `TSurname${i}`,
				email: `teacher${i}@example.com`,
				phone: `123-456-789${i}`,
				address: `Address${i}`,
				bloodType: "A+",
				sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
				birthday: new Date(
					new Date().setFullYear(new Date().getFullYear() - 30)
				)
			}
		});
	}

	const teachers = await prisma.teacher.findMany();
	console.log("Profesores creados:", teachers);
	if (teachers.length < 6) {
		throw new Error(
			"Error al crear los profesores, no se encontraron suficientes registros."
		);
	}

	// CLASS
	for (let i = 0; i < grades.length; i++) {
		await prisma.class.create({
			data: {
				name: `${grades[i].level}A`,
				gradeId: grades[i].id, // Usa el ID del grado que fue generado dinámicamente
				capacity: Math.floor(Math.random() * (20 - 15 + 1)) + 15,
				supervisorId: teachers[i % teachers.length].id // Usa un ID de supervisor válido
			}
		});
	}

	const classes = await prisma.class.findMany();
	console.log("Clases creadas:", classes);
	if (classes.length !== 6) {
		throw new Error(
			"Error al crear las clases, no se encontraron suficientes registros."
		);
	}

	// SUBJECT
	const subjectData = [
		{ name: "Mathematics" },
		{ name: "Science" },
		{ name: "English" },
		{ name: "History" },
		{ name: "Geography" },
		{ name: "Physics" },
		{ name: "Chemistry" },
		{ name: "Biology" },
		{ name: "Computer Science" },
		{ name: "Art" }
	];

	for (const subject of subjectData) {
		await prisma.subject.create({ data: subject });
	}

	// PARENT
	for (let i = 1; i <= 25; i++) {
		await prisma.parent.create({
			data: {
				id: `parentId${i}`,
				username: `parentId${i}`,
				name: `PName ${i}`,
				surname: `PSurname ${i}`,
				email: `parent${i}@example.com`,
				phone: `123-456-789${i}`,
				address: `Address${i}`
			}
		});
	}

	// STUDENT
	for (let i = 1; i <= 50; i++) {
		await prisma.student.create({
			data: {
				id: `student${i}`,
				username: `student${i}`,
				name: `SName${i}`,
				surname: `SSurname${i}`,
				email: `student${i}@example.com`,
				phone: `987-654-321${i}`,
				address: `Address${i}`,
				bloodType: "O-",
				sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
				parentId: `parentId${Math.ceil(i / 2) % 25 || 25}`,
				gradeId: grades[i % grades.length].id, // Usa un `gradeId` válido de los grados creados
				classId: classes[i % classes.length].id, // Usa un `classId` válido de las clases creadas
				birthday: new Date(
					new Date().setFullYear(new Date().getFullYear() - 10)
				)
			}
		});
	}

	console.log("Seeding completed successfully.");
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error("Error during seeding:", e);
		await prisma.$disconnect();
		process.exit(1);
	});
